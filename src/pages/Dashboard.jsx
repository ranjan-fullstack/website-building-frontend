import { useEffect, useMemo, useState } from "react";
import "../styles/ui.css";
import "../styles/Dashboard.css";
import "../styles/TrackOrder.css";
import EmptyState from "../components/ui/EmptyState";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";
import AdminClientsModule from "./admin/AdminClientsModule";
import AdminDashboardHome from "./admin/AdminDashboardHome";
import LeadsModule from "./admin/LeadsModule";
import PaymentsModule from "./admin/PaymentsModule";
import WebsitesModule from "./admin/WebsitesModule";
import ClientDashboard from "./ClientDashboard";
import AdminOrdersPanel from "./dashboard/AdminOrdersPanel";
import AdminUsersPanel from "./dashboard/AdminUsersPanel";
import DashboardLayout from "./dashboard/DashboardLayout";
import SubscriptionPanel from "./dashboard/SubscriptionPanel";
import UserOrdersPanel from "./dashboard/UserOrdersPanel";
import { defaultWebsiteProject, orderStatusOptions } from "./dashboard/constants";
import TemplateBuilder from "./TemplateBuilder";
import TemplatePreview from "./TemplatePreview";

const buildProjectDrafts = (users = []) =>
  users.reduce((drafts, dashboardUser) => {
    drafts[dashboardUser._id] = {
      ...defaultWebsiteProject,
      ...(dashboardUser.websiteProject || {}),
    };

    return drafts;
  }, {});

const getVisibleAdminUsers = (users = [], currentUserId) =>
  users.filter((dashboardUser) => dashboardUser._id !== currentUserId);

const getDashboardTabFromHash = (hash, isAdmin = false) => {
  const route = hash.replace(/^#?/, "");
  const startsWith = (section) =>
    route.startsWith(`/dashboard/${section}`) || route.startsWith(`/admin/${section}`);

  if (isAdmin) {
    for (const section of ["leads", "users", "orders", "payments", "websites", "clients"]) {
      if (startsWith(section)) {
        return section;
      }
    }

    return "admin-dashboard";
  }

  if (route.startsWith("/dashboard/templates")) {
    return "templates";
  }

  if (route.startsWith("/dashboard/subscription")) {
    return "subscription";
  }

  if (startsWith("users")) {
    return "users";
  }

  return "track";
};

const adminTabs = [
  { id: "admin-dashboard", label: "Overview", href: "#/dashboard", icon: "layout" },
  { id: "leads", label: "Leads", href: "#/dashboard/leads", icon: "users" },
  { id: "orders", label: "Orders", href: "#/dashboard/orders", icon: "cart" },
  { id: "payments", label: "Payments", href: "#/dashboard/payments", icon: "tag" },
  { id: "websites", label: "Websites", href: "#/dashboard/websites", icon: "globe" },
  { id: "clients", label: "Clients", href: "#/dashboard/clients", icon: "users" },
];

const customerTabs = [
  { id: "track", label: "My Website", href: "#/dashboard", icon: "globe" },
  { id: "templates", label: "Templates", href: "#/dashboard/templates", icon: "layout" },
  { id: "subscription", label: "Subscription", href: "#/dashboard/subscription", icon: "tag" },
];

const RegularDashboard = ({ hash = "#/dashboard" }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [adminError, setAdminError] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState("");
  const [savingProjectUserId, setSavingProjectUserId] = useState("");
  const [projectDrafts, setProjectDrafts] = useState({});
  const [trackState, setTrackState] = useState("loading"); // loading | ready | error
  const [userOrders, setUserOrders] = useState([]);
  const [userOrderStatuses, setUserOrderStatuses] = useState(orderStatusOptions);
  const [chooseTemplateError, setChooseTemplateError] = useState("");
  const [isChoosingTemplate, setIsChoosingTemplate] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState(orderStatusOptions);
  const [orderDrafts, setOrderDrafts] = useState({});
  const [timelineDrafts, setTimelineDrafts] = useState({});
  const [ordersState, setOrdersState] = useState("loading"); // loading | ready | error
  const [ordersActionError, setOrdersActionError] = useState("");
  const [savingOrderId, setSavingOrderId] = useState("");
  const [copyLabelByOrder, setCopyLabelByOrder] = useState({});
  const [reloadKey, setReloadKey] = useState(0);
  const isAdmin = user?.role === "admin";
  const activeTab = getDashboardTabFromHash(hash, isAdmin);
  const isTemplatePreview = hash.replace(/^#?/, "").startsWith("/dashboard/templates/");
  const visibleAdminUsers = getVisibleAdminUsers(adminData?.latestUsers, user?.id);
  const tabs = useMemo(() => (isAdmin ? adminTabs : customerTabs), [isAdmin]);
  const reload = () => {
    setOrdersState("loading");
    setTrackState("loading");
    setReloadKey((key) => key + 1);
  };

  useEffect(() => {
    if (activeTab !== "users" || user?.role !== "admin") {
      return;
    }

    apiRequest("/admin/dashboard")
      .then((data) => {
        setAdminError("");
        setAdminData(data);
        setProjectDrafts(buildProjectDrafts(data.latestUsers));
      })
      .catch((error) => setAdminError(error.message));
  }, [activeTab, user?.role, reloadKey]);

  useEffect(() => {
    if (activeTab !== "orders" || user?.role !== "admin") {
      return;
    }

    apiRequest("/orders")
      .then((data) => {
        setOrdersActionError("");
        setOrders(data.orders || []);
        setOrderStatuses(data.statuses || orderStatusOptions);
        setOrderDrafts(
          (data.orders || []).reduce((drafts, order) => {
            drafts[order.id] = {
              status: order.status,
              websiteUrl: order.websiteUrl || "",
              note: "",
            };
            return drafts;
          }, {})
        );
        setOrdersState("ready");
      })
      .catch(() => setOrdersState("error"));
  }, [activeTab, user?.role, reloadKey]);

  useEffect(() => {
    if (activeTab !== "track" || !isAuthenticated) {
      return;
    }

    Promise.all([apiRequest("/auth/me"), apiRequest("/orders/my/active")])
      .then(([{ user: freshUser }, orderData]) => {
        const nextOrders = orderData.orders || (orderData.order ? [orderData.order] : []);
        setUserOrders(nextOrders);
        setUserOrderStatuses(orderData.statuses || orderStatusOptions);
        window.localStorage.setItem("webmitra_google_user", JSON.stringify(freshUser));
        setTrackState("ready");
      })
      .catch(() => setTrackState("error"));
  }, [activeTab, isAuthenticated, reloadKey]);

  const handleLogout = () => {
    logout();
    window.location.hash = "#/login";
  };

  const updateUserRole = async (userId, role) => {
    setUpdatingUserId(userId);
    setAdminError("");

    try {
      const updatedData = await apiRequest(`/admin/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      setAdminData(updatedData);
    } catch (error) {
      setAdminError(error.message);
    } finally {
      setUpdatingUserId("");
    }
  };

  const updateProjectDraft = (userId, field, value) => {
    setProjectDrafts((currentDrafts) => ({
      ...currentDrafts,
      [userId]: {
        ...defaultWebsiteProject,
        ...(currentDrafts[userId] || {}),
        [field]: value,
      },
    }));
  };

  const updateUserProject = async (userId) => {
    setSavingProjectUserId(userId);
    setAdminError("");

    try {
      const updatedData = await apiRequest(`/admin/users/${userId}/website-project`, {
        method: "PATCH",
        body: JSON.stringify(projectDrafts[userId] || defaultWebsiteProject),
      });
      setAdminData(updatedData);
      setProjectDrafts(buildProjectDrafts(updatedData.latestUsers));
    } catch (error) {
      setAdminError(error.message);
    } finally {
      setSavingProjectUserId("");
    }
  };

  const chooseTemplate = async (template) => {
    setIsChoosingTemplate(true);
    setChooseTemplateError("");

    try {
      const { user: freshUser } = await apiRequest("/auth/website-template", {
        method: "PATCH",
        body: JSON.stringify({
          templateSlug: template.slug,
          templateTitle: template.title,
        }),
      });

      window.localStorage.setItem("webmitra_google_user", JSON.stringify(freshUser));
      window.location.hash = "#/dashboard";
    } catch (error) {
      setChooseTemplateError(error.message);
    } finally {
      setIsChoosingTemplate(false);
    }
  };

  const updateOrderDraft = (orderId, field, value) => {
    setOrderDrafts((currentDrafts) => ({
      ...currentDrafts,
      [orderId]: {
        ...(currentDrafts[orderId] || {}),
        [field]: value,
      },
    }));
  };

  const updateTimelineDraft = (orderId, field, value) => {
    setTimelineDrafts((currentDrafts) => ({
      ...currentDrafts,
      [orderId]: {
        ...(currentDrafts[orderId] || {}),
        [field]: value,
      },
    }));
  };

  const refreshOrderInList = (nextOrder) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => (order.id === nextOrder.id ? nextOrder : order))
    );
  };

  const saveOrderStatus = async (orderId) => {
    setSavingOrderId(orderId);
    setOrdersActionError("");

    try {
      const draft = orderDrafts[orderId] || {};
      const { order } = await apiRequest(`/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify(draft),
      });
      refreshOrderInList(order);
      updateOrderDraft(orderId, "note", "");
    } catch (error) {
      setOrdersActionError(error.message);
    } finally {
      setSavingOrderId("");
    }
  };

  const decideLead = async (orderId, decision) => {
    setSavingOrderId(orderId);
    setOrdersActionError("");

    try {
      const { order } = await apiRequest(`/orders/${orderId}/decision`, {
        method: "PUT",
        body: JSON.stringify({
          decision,
          note:
            decision === "create"
              ? "Admin confirmed this WhatsApp lead as an order."
              : "Admin rejected this WhatsApp lead.",
        }),
      });
      refreshOrderInList(order);
    } catch (error) {
      setOrdersActionError(error.message);
    } finally {
      setSavingOrderId("");
    }
  };

  const addOrderTimeline = async (orderId) => {
    setSavingOrderId(orderId);
    setOrdersActionError("");

    try {
      const draft = timelineDrafts[orderId] || {};
      const { order } = await apiRequest(`/orders/${orderId}/timeline`, {
        method: "POST",
        body: JSON.stringify({
          status: draft.status,
          title: draft.title || "Project update",
          note: draft.note,
        }),
      });
      refreshOrderInList(order);
      setTimelineDrafts((currentDrafts) => ({
        ...currentDrafts,
        [orderId]: { title: "", note: "", status: order.status },
      }));
    } catch (error) {
      setOrdersActionError(error.message);
    } finally {
      setSavingOrderId("");
    }
  };

  const copyTrackingLink = async (orderId) => {
    const trackingLink = `${window.location.origin}/track/${orderId}`;

    try {
      await navigator.clipboard.writeText(trackingLink);
      setCopyLabelByOrder((labels) => ({ ...labels, [orderId]: "Copied" }));
      window.setTimeout(() => {
        setCopyLabelByOrder((labels) => ({
          ...labels,
          [orderId]: "Copy tracking link",
        }));
      }, 1600);
    } catch {
      setCopyLabelByOrder((labels) => ({ ...labels, [orderId]: "Copy failed" }));
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="wm-gate">
        <EmptyState
          icon="🔒"
          title="Login required"
          text="Sign in to track your website and manage your plan."
          actionLabel="Go to login"
          actionHref="#/login"
        />
      </main>
    );
  }

  const isAdminTab = (tab) => activeTab === tab && user.role === "admin";

  return (
    <DashboardLayout tabs={tabs} activeTab={activeTab} user={user} onLogout={handleLogout}>
      {isAdminTab("admin-dashboard") ? <AdminDashboardHome /> : null}
      {isAdminTab("leads") ? <LeadsModule /> : null}
      {isAdminTab("payments") ? <PaymentsModule /> : null}
      {isAdminTab("websites") ? <WebsitesModule /> : null}
      {isAdminTab("clients") ? <AdminClientsModule /> : null}

      {isAdminTab("orders") ? (
        <AdminOrdersPanel
          orders={orders}
          orderStatuses={orderStatuses}
          orderDrafts={orderDrafts}
          timelineDrafts={timelineDrafts}
          loadState={ordersState}
          actionError={ordersActionError}
          savingOrderId={savingOrderId}
          copyLabelByOrder={copyLabelByOrder}
          onUpdateOrderDraft={updateOrderDraft}
          onUpdateTimelineDraft={updateTimelineDraft}
          onSaveStatus={saveOrderStatus}
          onDecideLead={decideLead}
          onAddTimeline={addOrderTimeline}
          onCopyLink={copyTrackingLink}
          onRetry={reload}
        />
      ) : null}

      {isAdminTab("users") ? (
        <AdminUsersPanel
          adminData={adminData}
          visibleUsers={visibleAdminUsers}
          projectDrafts={projectDrafts}
          updatingUserId={updatingUserId}
          savingProjectUserId={savingProjectUserId}
          loadError={adminError}
          onRetry={reload}
          onUpdateRole={updateUserRole}
          onUpdateProjectDraft={updateProjectDraft}
          onSaveProject={updateUserProject}
        />
      ) : null}

      {activeTab === "track" ? (
        <UserOrdersPanel
          orders={userOrders}
          statuses={userOrderStatuses}
          loadState={trackState}
          onRetry={reload}
        />
      ) : null}

      {activeTab === "subscription" ? <SubscriptionPanel /> : null}

      {activeTab === "templates" ? (
        <div className="dashboard-template-panel">
          {isTemplatePreview ? (
            <TemplatePreview
              backHref="#/dashboard/templates"
              chooseError={chooseTemplateError}
              chooseLabel="Choose this template"
              embedded
              hash={hash}
              isChoosing={isChoosingTemplate}
              onChooseTemplate={chooseTemplate}
            />
          ) : (
            <TemplateBuilder basePath="#/dashboard/templates" embedded />
          )}
        </div>
      ) : null}
    </DashboardLayout>
  );
};

const Dashboard = ({ hash = "#/dashboard" }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.role !== "admin" && user?.tenantId) {
    return <ClientDashboard hash={hash} />;
  }

  return <RegularDashboard hash={hash} />;
};

export default Dashboard;

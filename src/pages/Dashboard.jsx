import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";
import AdminDashboardHome from "./admin/AdminDashboardHome";
import LeadsModule from "./admin/LeadsModule";
import PaymentsModule from "./admin/PaymentsModule";
import WebsitesModule from "./admin/WebsitesModule";
import TemplateBuilder from "./TemplateBuilder";
import TemplatePreview from "./TemplatePreview";
import "../styles/Dashboard.css";
import "../styles/TrackOrder.css";

const defaultWebsiteProject = {
  status: "not-started",
  selectedTemplate: "",
  adminNote: "",
  websiteUrl: "",
};

const projectStatusOptions = [
  ["not-started", "Not started"],
  ["in-progress", "In progress"],
  ["done", "Done"],
];

const orderStatusOptions = [
  "New Lead",
  "Contacted",
  "Requirements Collected",
  "Design Started",
  "Design Ready",
  "Client Review",
  "Changes Requested",
  "Finalizing",
  "Website Live",
  "Delivered",
];

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

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

const subscriptionPlans = [
  ["Current plan", "Free"],
  ["Included pages", "3 pages"],
  ["Branding", "WebMitra branding visible"],
  ["Upgrade path", "Launch plan at Rs 249/month"],
];

const getDashboardTabFromHash = (hash, isAdmin = false) => {
  const route = hash.replace(/^#?/, "");

  if (isAdmin) {
    if (route.startsWith("/dashboard/leads") || route.startsWith("/admin/leads")) {
      return "leads";
    }

    if (route.startsWith("/dashboard/users") || route.startsWith("/admin/users")) {
      return "users";
    }

    if (route.startsWith("/dashboard/orders") || route.startsWith("/admin/orders")) {
      return "orders";
    }

    if (route.startsWith("/dashboard/payments") || route.startsWith("/admin/payments")) {
      return "payments";
    }

    if (route.startsWith("/dashboard/websites") || route.startsWith("/admin/websites")) {
      return "websites";
    }

    return "admin-dashboard";
  }

  if (route.startsWith("/dashboard/templates")) {
    return "templates";
  }

  if (route.startsWith("/dashboard/subscription")) {
    return "subscription";
  }

  if (route.startsWith("/dashboard/users") || route.startsWith("/admin/users")) {
    return "users";
  }

  return "track";
};

const Dashboard = ({ hash = "#/dashboard" }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [adminError, setAdminError] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState("");
  const [savingProjectUserId, setSavingProjectUserId] = useState("");
  const [projectDrafts, setProjectDrafts] = useState({});
  const [trackError, setTrackError] = useState("");
  const [userOrders, setUserOrders] = useState([]);
  const [userOrderStatuses, setUserOrderStatuses] = useState(orderStatusOptions);
  const [openUserOrderId, setOpenUserOrderId] = useState("");
  const [chooseTemplateError, setChooseTemplateError] = useState("");
  const [isChoosingTemplate, setIsChoosingTemplate] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState(orderStatusOptions);
  const [orderDrafts, setOrderDrafts] = useState({});
  const [timelineDrafts, setTimelineDrafts] = useState({});
  const [ordersError, setOrdersError] = useState("");
  const [savingOrderId, setSavingOrderId] = useState("");
  const [copyLabelByOrder, setCopyLabelByOrder] = useState({});
  const [openAdminOrderId, setOpenAdminOrderId] = useState("");
  const isAdmin = user?.role === "admin";
  const activeTab = getDashboardTabFromHash(hash, isAdmin);
  const isTemplatePreview = hash.replace(/^#?/, "").startsWith("/dashboard/templates/");
  const visibleAdminUsers = getVisibleAdminUsers(adminData?.latestUsers, user?.id);
  const hasStartedTracking = userOrders.length > 0;

  const tabs = useMemo(() => {
    if (isAdmin) {
      return [
        {
          id: "admin-dashboard",
          label: "Dashboard",
          href: "#/dashboard",
        },
        {
          id: "leads",
          label: "Leads",
          href: "#/dashboard/leads",
        },
        {
          id: "orders",
          label: "Orders",
          href: "#/dashboard/orders",
        },
        {
          id: "payments",
          label: "Payments",
          href: "#/dashboard/payments",
        },
        {
          id: "websites",
          label: "Websites",
          href: "#/dashboard/websites",
        },
      ];
    }

    return [
      { id: "track", label: "Track website", href: "#/dashboard" },
      {
        id: "subscription",
        label: "Subscription",
        href: "#/dashboard/subscription",
      },
      { id: "templates", label: "Choose templates", href: "#/dashboard/templates" },
    ];
  }, [isAdmin]);

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
  }, [activeTab, user?.role]);

  useEffect(() => {
    if (activeTab !== "orders" || user?.role !== "admin") {
      return;
    }

    apiRequest("/orders")
      .then((data) => {
        setOrdersError("");
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
      })
      .catch((error) => setOrdersError(error.message));
  }, [activeTab, user?.role]);

  useEffect(() => {
    if (activeTab !== "track" || !isAuthenticated) {
      return;
    }

    Promise.all([apiRequest("/auth/me"), apiRequest("/orders/my/active")])
      .then(([{ user: freshUser }, orderData]) => {
        setTrackError("");
        const nextOrders = orderData.orders || (orderData.order ? [orderData.order] : []);
        setUserOrders(nextOrders);
        setUserOrderStatuses(orderData.statuses || orderStatusOptions);
        window.localStorage.setItem("webmitra_google_user", JSON.stringify(freshUser));
      })
      .catch((error) => setTrackError(error.message));
  }, [activeTab, isAuthenticated, openUserOrderId]);

  const toggleUserOrder = (orderId) => {
    if (openUserOrderId === orderId) {
      setOpenUserOrderId("");
      return;
    }

    setOpenUserOrderId(orderId);
  };

  const toggleAdminOrder = (orderId) => {
    if (openAdminOrderId === orderId) {
      setOpenAdminOrderId("");
      return;
    }

    setOpenAdminOrderId(orderId);
  };

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
    setOrdersError("");

    try {
      const draft = orderDrafts[orderId] || {};
      const { order } = await apiRequest(`/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify(draft),
      });
      refreshOrderInList(order);
      updateOrderDraft(orderId, "note", "");
    } catch (error) {
      setOrdersError(error.message);
    } finally {
      setSavingOrderId("");
    }
  };

  const decideLead = async (orderId, decision) => {
    setSavingOrderId(orderId);
    setOrdersError("");

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
      setOrdersError(error.message);
    } finally {
      setSavingOrderId("");
    }
  };

  const addOrderTimeline = async (orderId) => {
    setSavingOrderId(orderId);
    setOrdersError("");

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
      setOrdersError(error.message);
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
      <main className="dashboard-gate">
        <section>
          <p className="dashboard-kicker">Login required</p>
          <h1>Your dashboard is waiting</h1>
          <p>Sign in with Gmail to track your website and manage your plan.</p>
          <a className="dashboard-primary-link" href="#/login">
            Go to login
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <a className="dashboard-brand" href="#/">
          <span>WM</span>
          <strong>WebMitra</strong>
        </a>

        <div className="dashboard-profile">
          {user.avatar ? <img src={user.avatar} alt={user.name} /> : null}
          <strong>{user.name}</strong>
          <span>{user.email}</span>
          <small className={`dashboard-role ${user.role}`}>{user.role}</small>
        </div>

        <nav className="dashboard-nav">
          {tabs.map((tab) => (
            <a
              className={activeTab === tab.id ? "active" : ""}
              href={tab.href}
              key={tab.id}
            >
              {tab.label}
            </a>
          ))}
        </nav>

        <button className="dashboard-logout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <section className="dashboard-content">
        {activeTab === "admin-dashboard" && user.role === "admin" ? (
          <AdminDashboardHome />
        ) : null}

        {activeTab === "leads" && user.role === "admin" ? <LeadsModule /> : null}

        {activeTab === "payments" && user.role === "admin" ? (
          <PaymentsModule />
        ) : null}

        {activeTab === "websites" && user.role === "admin" ? (
          <WebsitesModule />
        ) : null}

        {activeTab === "track" ? (
          <div className="dashboard-panel">
            <div className="dashboard-heading">
              <p className="dashboard-kicker">Website creation</p>
              <h1>Track your website progress</h1>
              <p>
                Watch your website move from setup to build to final launch.
              </p>
            </div>

            {trackError ? <p className="dashboard-error">{trackError}</p> : null}

            {!hasStartedTracking ? (
              <div className="project-empty-state">
                <p className="dashboard-kicker">Waiting for confirmation</p>
                <h2>Not yet finalized your website.</h2>
                <p>
                  After you send a WhatsApp message, our team will talk with you
                  first. Once admin creates your order, every status update will
                  show here automatically.
                </p>
                <a href="#/dashboard/templates">Choose a template</a>
              </div>
            ) : (
              <>
                <div className="user-order-list">
                  {userOrders.map((order) => {
                    const isOpen = openUserOrderId === order.id;
                    const orderStepIndex = Math.max(
                      0,
                      userOrderStatuses.indexOf(order.status || "New Lead")
                    );

                    return (
                      <article className="user-order-accordion" key={order.id}>
                        <button
                          className={isOpen ? "open" : ""}
                          type="button"
                          onClick={() => toggleUserOrder(order.id)}
                        >
                          <span>
                            <strong>{order.id}</strong>
                            <small>{order.template}</small>
                          </span>
                          <em>{order.status}</em>
                        </button>

                        {isOpen ? (
                          <div className="user-order-details">
                            <div className="project-status-card">
                              <div>
                                <span>Order ID</span>
                                <strong>{order.id}</strong>
                              </div>
                              <div>
                                <span>Selected template</span>
                                <strong>{order.template}</strong>
                                <small>Current status: {order.status}</small>
                                {order.updatedAt ? (
                                  <small>Updated {formatDateTime(order.updatedAt)}</small>
                                ) : null}
                              </div>
                              <div className="project-status-actions">
                                <small>
                                  This status belongs only to order{" "}
                                  <strong>{order.id}</strong>.
                                </small>
                                {order.websiteUrl ? (
                                  <a
                                    href={order.websiteUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Open website
                                  </a>
                                ) : (
                                  <small>
                                    Your final website link will show here after launch.
                                  </small>
                                )}
                              </div>
                            </div>

                            <div className="track-progress-card dashboard-track-progress">
                              <div className="track-progress-bar">
                                <span
                                  style={{
                                    width: `${((orderStepIndex + 1) / userOrderStatuses.length) * 100}%`,
                                  }}
                                ></span>
                              </div>
                              <div className="track-steps">
                                {userOrderStatuses.map((status, index) => (
                                  <span
                                    className={index <= orderStepIndex ? "complete" : ""}
                                    key={status}
                                  >
                                    {status}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="timeline-list">
                              {order.timeline.map((item, index) => (
                                <article
                                  className="timeline-card"
                                  key={item._id || item.createdAt}
                                >
                                  <span>{index + 1}</span>
                                  <div>
                                    <strong>{item.title}</strong>
                                    <p>{item.note || item.status}</p>
                                    {item.createdAt ? (
                                      <small>{formatDateTime(item.createdAt)}</small>
                                    ) : null}
                                  </div>
                                  <small className="in-progress">{item.status}</small>
                                </article>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ) : null}

        {activeTab === "subscription" ? (
          <div className="dashboard-panel">
            <div className="dashboard-heading">
              <p className="dashboard-kicker">Plan details</p>
              <h1>Manage subscription</h1>
              <p>Your current plan and upgrade path are shown here.</p>
            </div>

            <div className="subscription-grid">
              {subscriptionPlans.map(([label, value]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>

            <div className="upgrade-card">
              <h2>Need more pages or custom domain?</h2>
              <p>
                Upgrade to Launch or Growth when your business is ready for a
                stronger public website.
              </p>
              <a href="#pricing">View pricing</a>
            </div>
          </div>
        ) : null}

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

        {activeTab === "users" && user.role === "admin" ? (
          <div className="dashboard-panel">
            <div className="dashboard-heading">
              <p className="dashboard-kicker">Admin control</p>
              <h1>Manage users</h1>
              <p>Promote trusted accounts to admin or keep customers as users.</p>
            </div>

            {adminError ? <p className="dashboard-error">{adminError}</p> : null}

            {adminData ? (
              <>
                <div className="admin-metrics">
                  <article>
                    <strong>{adminData.stats.totalUsers}</strong>
                    <span>Total users</span>
                  </article>
                  <article>
                    <strong>{adminData.stats.normalUsers}</strong>
                    <span>Customers</span>
                  </article>
                  <article>
                    <strong>{adminData.stats.admins}</strong>
                    <span>Admins</span>
                  </article>
                </div>

                <div className="user-table">
                  {visibleAdminUsers.map((dashboardUser) => (
                    <article key={dashboardUser._id}>
                      <div className="user-cell">
                        {dashboardUser.avatar ? (
                          <img src={dashboardUser.avatar} alt={dashboardUser.name} />
                        ) : null}
                        <div>
                          <strong>{dashboardUser.name}</strong>
                          <span>{dashboardUser.email}</span>
                        </div>
                      </div>
                      <select
                        value={dashboardUser.role}
                        disabled={updatingUserId === dashboardUser._id}
                        onChange={(event) =>
                          updateUserRole(dashboardUser._id, event.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <div className="project-admin-form">
                        <label>
                          Project status
                          <select
                            value={
                              projectDrafts[dashboardUser._id]?.status ||
                              "not-started"
                            }
                            disabled={savingProjectUserId === dashboardUser._id}
                            onChange={(event) =>
                              updateProjectDraft(
                                dashboardUser._id,
                                "status",
                                event.target.value
                              )
                            }
                          >
                            {projectStatusOptions.map(([value, label]) => (
                              <option value={value} key={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label>
                          Selected template
                          <input
                            type="text"
                            placeholder="Mobile shop, gym, clinic..."
                            value={
                              projectDrafts[dashboardUser._id]?.selectedTemplate ||
                              ""
                            }
                            disabled={savingProjectUserId === dashboardUser._id}
                            onChange={(event) =>
                              updateProjectDraft(
                                dashboardUser._id,
                                "selectedTemplate",
                                event.target.value
                              )
                            }
                          />
                        </label>

                        <label>
                          Website URL
                          <input
                            type="url"
                            placeholder="https://customer-site.com"
                            value={projectDrafts[dashboardUser._id]?.websiteUrl || ""}
                            disabled={savingProjectUserId === dashboardUser._id}
                            onChange={(event) =>
                              updateProjectDraft(
                                dashboardUser._id,
                                "websiteUrl",
                                event.target.value
                              )
                            }
                          />
                        </label>

                        <label className="project-admin-note">
                          Note for user
                          <textarea
                            rows="3"
                            placeholder="We are preparing your homepage sections..."
                            value={projectDrafts[dashboardUser._id]?.adminNote || ""}
                            disabled={savingProjectUserId === dashboardUser._id}
                            onChange={(event) =>
                              updateProjectDraft(
                                dashboardUser._id,
                                "adminNote",
                                event.target.value
                              )
                            }
                          ></textarea>
                        </label>

                        <button
                          type="button"
                          disabled={savingProjectUserId === dashboardUser._id}
                          onClick={() => updateUserProject(dashboardUser._id)}
                        >
                          {savingProjectUserId === dashboardUser._id
                            ? "Saving..."
                            : "Save project update"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <p className="dashboard-loading">Loading users...</p>
            )}
          </div>
        ) : null}

        {activeTab === "orders" && user.role === "admin" ? (
          <div className="dashboard-panel">
            <div className="dashboard-heading">
              <p className="dashboard-kicker">Order control</p>
              <h1>Website orders</h1>
              <p>
                Manage leads, update the delivery pipeline, add timeline notes,
                and publish final website links.
              </p>
            </div>

            {ordersError ? <p className="dashboard-error">{ordersError}</p> : null}

            <div className="order-admin-list">
              {orders.length ? (
                orders.map((order) => {
                  const isOpen = openAdminOrderId === order.id;

                  return (
                    <article className="order-admin-card" key={order.id}>
                      <button
                        className={`order-admin-top ${isOpen ? "open" : ""}`}
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggleAdminOrder(order.id)}
                      >
                        <div>
                          <span>{order.id}</span>
                          <strong>{order.name}</strong>
                          <p>
                            {order.template} | {order.phone}
                          </p>
                        </div>
                        <small>
                          {order.orderState === "lead"
                            ? "Lead"
                            : order.orderState === "rejected"
                              ? "Rejected"
                              : order.status}
                        </small>
                      </button>

                      {isOpen ? (
                        <>
                          {order.orderState === "lead" ? (
                            <div className="order-admin-footer lead-decision-row">
                              <button
                                type="button"
                                disabled={savingOrderId === order.id}
                                onClick={() => decideLead(order.id, "create")}
                              >
                                {savingOrderId === order.id ? "Saving..." : "Create order"}
                              </button>
                              <button
                                className="reject"
                                type="button"
                                disabled={savingOrderId === order.id}
                                onClick={() => decideLead(order.id, "reject")}
                              >
                                Reject
                              </button>
                            </div>
                          ) : null}

                          {order.orderState === "order" ? (
                            <>
                              <div className="order-admin-actions">
                                <label>
                                  Status
                                  <select
                                    value={orderDrafts[order.id]?.status || order.status}
                                    disabled={savingOrderId === order.id}
                                    onChange={(event) =>
                                      updateOrderDraft(
                                        order.id,
                                        "status",
                                        event.target.value
                                      )
                                    }
                                  >
                                    {orderStatuses.map((status) => (
                                      <option value={status} key={status}>
                                        {status}
                                      </option>
                                    ))}
                                  </select>
                                </label>

                                <label>
                                  Website URL
                                  <input
                                    type="url"
                                    placeholder="https://client-site.com"
                                    value={orderDrafts[order.id]?.websiteUrl || ""}
                                    disabled={savingOrderId === order.id}
                                    onChange={(event) =>
                                      updateOrderDraft(
                                        order.id,
                                        "websiteUrl",
                                        event.target.value
                                      )
                                    }
                                  />
                                </label>

                                <label className="order-admin-wide">
                                  Status note
                                  <textarea
                                    rows="2"
                                    placeholder="Short update for this status change"
                                    value={orderDrafts[order.id]?.note || ""}
                                    disabled={savingOrderId === order.id}
                                    onChange={(event) =>
                                      updateOrderDraft(
                                        order.id,
                                        "note",
                                        event.target.value
                                      )
                                    }
                                  ></textarea>
                                </label>

                                <button
                                  type="button"
                                  disabled={savingOrderId === order.id}
                                  onClick={() => saveOrderStatus(order.id)}
                                >
                                  {savingOrderId === order.id
                                    ? "Saving..."
                                    : "Update status"}
                                </button>
                              </div>

                              <div className="order-admin-actions timeline-admin-actions">
                                <label>
                                  Timeline title
                                  <input
                                    type="text"
                                    placeholder="Homepage draft shared"
                                    value={timelineDrafts[order.id]?.title || ""}
                                    disabled={savingOrderId === order.id}
                                    onChange={(event) =>
                                      updateTimelineDraft(
                                        order.id,
                                        "title",
                                        event.target.value
                                      )
                                    }
                                  />
                                </label>

                                <label>
                                  Timeline status
                                  <select
                                    value={timelineDrafts[order.id]?.status || order.status}
                                    disabled={savingOrderId === order.id}
                                    onChange={(event) =>
                                      updateTimelineDraft(
                                        order.id,
                                        "status",
                                        event.target.value
                                      )
                                    }
                                  >
                                    {orderStatuses.map((status) => (
                                      <option value={status} key={status}>
                                        {status}
                                      </option>
                                    ))}
                                  </select>
                                </label>

                                <label className="order-admin-wide">
                                  Timeline note
                                  <textarea
                                    rows="2"
                                    placeholder="Add a visible project update"
                                    value={timelineDrafts[order.id]?.note || ""}
                                    disabled={savingOrderId === order.id}
                                    onChange={(event) =>
                                      updateTimelineDraft(
                                        order.id,
                                        "note",
                                        event.target.value
                                      )
                                    }
                                  ></textarea>
                                </label>

                                <button
                                  type="button"
                                  disabled={savingOrderId === order.id}
                                  onClick={() => addOrderTimeline(order.id)}
                                >
                                  Add timeline update
                                </button>
                              </div>
                            </>
                          ) : null}

                          <div className="order-admin-footer">
                            {order.orderState === "order" ? (
                              <>
                                <a href={`/track/${order.id}`}>Open tracking page</a>
                                <button
                                  type="button"
                                  onClick={() => copyTrackingLink(order.id)}
                                >
                                  {copyLabelByOrder[order.id] || "Copy tracking link"}
                                </button>
                              </>
                            ) : null}
                            {order.websiteUrl ? (
                              <a
                                href={order.websiteUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open website
                              </a>
                            ) : null}
                            <button
                              className="close-order"
                              type="button"
                              onClick={() => setOpenAdminOrderId("")}
                            >
                              Close
                            </button>
                          </div>
                        </>
                      ) : null}
                    </article>
                  );
                })
              ) : (
                <p className="dashboard-loading">No orders yet.</p>
              )}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default Dashboard;

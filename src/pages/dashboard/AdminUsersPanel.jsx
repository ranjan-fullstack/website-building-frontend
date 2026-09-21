import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import { SkeletonDashboard } from "../../components/ui/Skeleton";
import { PanelHeading } from "./DashboardLayout";
import { defaultWebsiteProject, projectStatusOptions } from "./constants";

const AdminUsersPanel = ({
  adminData,
  visibleUsers,
  projectDrafts,
  updatingUserId,
  savingProjectUserId,
  loadError,
  onRetry,
  onUpdateRole,
  onUpdateProjectDraft,
  onSaveProject,
}) => (
  <div className="wm-panel">
    <PanelHeading
      kicker="Admin control"
      title="Manage users"
      text="Promote trusted accounts to admin or keep customers as users."
    />

    {loadError && !adminData ? (
      <ErrorState title="Something went wrong" text="We could not load users." onRetry={onRetry} />
    ) : null}
    {loadError && adminData ? (
      <p className="wm-alert wm-alert-error" role="alert">
        {loadError}
      </p>
    ) : null}

    {!adminData && !loadError ? <SkeletonDashboard /> : null}

    {adminData ? (
      <>
        <div className="wm-stat-grid">
          <article className="wm-card wm-stat">
            <span>Total users</span>
            <strong>{adminData.stats.totalUsers}</strong>
          </article>
          <article className="wm-card wm-stat">
            <span>Customers</span>
            <strong>{adminData.stats.normalUsers}</strong>
          </article>
          <article className="wm-card wm-stat">
            <span>Admins</span>
            <strong>{adminData.stats.admins}</strong>
          </article>
        </div>

        {!visibleUsers.length ? (
          <EmptyState icon="☺" title="No other users yet" text="Customers who create an account will appear here." />
        ) : (
          <div className="user-table">
            {visibleUsers.map((dashboardUser) => {
              const id = dashboardUser._id;
              const draft = { ...defaultWebsiteProject, ...(projectDrafts[id] || {}) };
              const saving = savingProjectUserId === id;

              return (
                <article key={id}>
                  <div className="user-cell">
                    {dashboardUser.avatar ? (
                      <img src={dashboardUser.avatar} alt="" referrerPolicy="no-referrer" />
                    ) : null}
                    <div>
                      <strong>{dashboardUser.name}</strong>
                      <span>{dashboardUser.email}</span>
                    </div>
                  </div>

                  <div className="wm-field">
                    <label htmlFor={`role-${id}`}>Role</label>
                    <select
                      id={`role-${id}`}
                      className="wm-select"
                      value={dashboardUser.role}
                      disabled={updatingUserId === id}
                      onChange={(event) => onUpdateRole(id, event.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="project-admin-form">
                    <div className="wm-field">
                      <label htmlFor={`pstatus-${id}`}>Project status</label>
                      <select
                        id={`pstatus-${id}`}
                        className="wm-select"
                        value={draft.status}
                        disabled={saving}
                        onChange={(event) => onUpdateProjectDraft(id, "status", event.target.value)}
                      >
                        {projectStatusOptions.map(([value, label]) => (
                          <option value={value} key={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="wm-field">
                      <label htmlFor={`ptemplate-${id}`}>Selected template</label>
                      <input
                        id={`ptemplate-${id}`}
                        className="wm-input"
                        type="text"
                        placeholder="Mobile shop, gym, clinic..."
                        value={draft.selectedTemplate}
                        disabled={saving}
                        onChange={(event) => onUpdateProjectDraft(id, "selectedTemplate", event.target.value)}
                      />
                    </div>
                    <div className="wm-field">
                      <label htmlFor={`purl-${id}`}>Website URL</label>
                      <input
                        id={`purl-${id}`}
                        className="wm-input"
                        type="url"
                        placeholder="https://customer-site.com"
                        value={draft.websiteUrl}
                        disabled={saving}
                        onChange={(event) => onUpdateProjectDraft(id, "websiteUrl", event.target.value)}
                      />
                    </div>
                    <div className="wm-field project-admin-note">
                      <label htmlFor={`pnote-${id}`}>Note for user</label>
                      <textarea
                        id={`pnote-${id}`}
                        className="wm-textarea"
                        rows="3"
                        placeholder="We are preparing your homepage sections..."
                        value={draft.adminNote}
                        disabled={saving}
                        onChange={(event) => onUpdateProjectDraft(id, "adminNote", event.target.value)}
                      />
                    </div>
                    <button className="wm-btn wm-btn-primary" type="button" disabled={saving} onClick={() => onSaveProject(id)}>
                      {saving ? "Saving..." : "Save project update"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </>
    ) : null}
  </div>
);

export default AdminUsersPanel;

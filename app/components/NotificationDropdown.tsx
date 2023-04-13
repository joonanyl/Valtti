export function NotificationDropdown() {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="badge badge-lg badge-error">
        1
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 bg-base-300 rounded-box w-52">
        <li>
          <a>Notification</a>
        </li>
      </ul>
    </div>
  )
}

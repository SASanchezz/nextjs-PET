export default function Popup(props: any) {
  return (
    <div className="popup">
      <h1>Delete the Category?</h1>
      <h2>All templates in the category will be moved to the category "Other" </h2>
      <div className="btns">
        <button className="del-btn" onClick={props.onApprove}>Delete</button>
        <button className="cancel-btn" onClick={props.onCancel}>Cancel</button>
      </div>
    </div>
  )
};
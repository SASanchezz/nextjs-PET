export default function Toggle(props: any) {
  const isOn = props.isOn;

  const circle = <span className="circle" style={{background: isOn ? "#07D41B" : "#9B9D9F"}} />;
  const text = <h1 style={{color: isOn ? "#07D41B" : "#9B9D9F"}}>{isOn ? "On" : "Off"}</h1>;
  
  return (
    <div className="rectangle" onClick={props.onClick}
     style={{background: isOn ? "#3E3F49" : "#272934"}}>
      {isOn ? text : circle}
      {isOn ? circle : text}
    </div>
  )
}
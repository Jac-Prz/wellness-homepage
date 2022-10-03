const DateCell = (props) => {

  const cellDate = props.date.toLocaleDateString("en-GB").replaceAll("/", "");
  const dataForThisDate = props.data.find(entry => entry.date === cellDate);

  return (
    <div
      className={dataForThisDate ? "highlight" : "cell"}
      style={{ opacity: (props.date.getMonth() === props.thisMonth) ? "100%" : "70%" }}
      onClick={() => { props.showData(dataForThisDate) }}>
      {props.date.getDate()}
    </div>
  );
}

export default DateCell;
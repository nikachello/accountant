function InfoCard({ title, details }) {
  return (
    <div className="p-5 m-5 text-center bg-slate-200">
      <div className="pb-5">
        <h1 className="text-lg">{title}</h1>
      </div>
      <div>
        {Object.entries(details).map(([key, value]) => (
          <p key={key} className="text-lg">
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
}

export default InfoCard;

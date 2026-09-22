const ApplicantStatusDropdown = ({ status, onChange }) => {
  const getBadgeColor = () => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Reviewed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border outline-none cursor-pointer transition ${getBadgeColor()}`}
    >
      <option value="Pending">Pending</option>
      <option value="Reviewed">Reviewed</option>
      <option value="Accepted">Accepted</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
};

export default ApplicantStatusDropdown;
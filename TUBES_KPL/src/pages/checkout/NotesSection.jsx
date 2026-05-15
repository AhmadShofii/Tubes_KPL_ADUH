
const NotesSection = ({ notes, setNotes }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-[#0D4A22]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
        <h3 className="font-bold text-gray-800 tracking-wide text-sm uppercase">Notes Field</h3>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="e.g. Tolong sambalnya dipisah, atau titip di lobi saja ya."
        className="w-full text-sm text-gray-700 placeholder-gray-400 border-none focus:ring-0 resize-none outline-none"
        rows="2"
      ></textarea>
    </div>
  );
};

export default NotesSection;
interface InputProps {
  label: string;
  type: string;
  value: string;
  error: string;
  onChange: (t: string) => void;
}
const Input: React.FC<InputProps> = (i) => (
  <div className="mb-4" key={i.label}>
    <label className="block text-grey-darker text-sm font-bold mb-2">
      {i.label}
    </label>
    <input
      className={`shadow appearance-none border ${
        !!i.error && "border-red-600"
      } rounded w-full py-2 px-3 text-grey-darker`}
      type={i.type}
      value={i.value}
      onChange={(e) => i.onChange(e.target.value)}
    />
    {!!i.error && <p className="text-red-600 text-xs italic">{i.error}</p>}
  </div>
);

export default Input;

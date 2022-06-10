interface VersionProps {
  front: string;
  back: string | undefined;
}
const Version: React.FC<VersionProps> = ({ front, back }) => (
  <div className="flex items-center justify-end mt-4 text-slate-300">
    <div>
      <div>Front end version: {front}</div>
      {!!back && <div>Back end version: {back}</div>}
    </div>
  </div>
);
export default Version;

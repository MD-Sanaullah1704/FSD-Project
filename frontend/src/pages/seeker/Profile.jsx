import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold border border-blue-100">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{user?.name}</h1>
            <p className="text-xs text-slate-500 capitalize">{user?.role} Account</p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-xs">
          <div>
            <span className="font-semibold text-slate-400 uppercase text-[11px] block mb-1 tracking-wider">
              Email Address
            </span>
            <p className="text-slate-800 font-medium">{user?.email}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-400 uppercase text-[11px] block mb-1 tracking-wider">
              Bio
            </span>
            <p className="text-slate-700 leading-relaxed">
              {user?.profile?.bio || "No bio added yet. Apply for jobs with your external resume link."}
            </p>
          </div>

          {user?.profile?.skills?.length > 0 && (
            <div>
              <span className="font-semibold text-slate-400 uppercase text-[11px] block mb-2 tracking-wider">
                Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-slate-50 border border-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
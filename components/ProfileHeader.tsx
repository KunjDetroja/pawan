import Image from "next/image";

interface ProfileHeaderProps {
  name: string;
  role?: string;
  title: string;
  description?: string;
  imageUrl: string;
}

export function ProfileHeader({
  name,
  role = "Owner",
  title,
  description,
  imageUrl,
}: ProfileHeaderProps) {
  return (
    <header className="relative flex flex-col items-center px-6 pb-6 pt-12">
      {/* Profile Image with Glow Effect */}
      <div className="group relative">
        <div className="absolute -inset-0.5 rounded-full bg-linear-to-r from-primary to-purple-600 opacity-10 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-black p-1">
          <Image
            src={imageUrl}
            alt={`${title} Portrait`}
            width={128}
            height={128}
            className="h-full w-full rounded-full object-cover pt-[15px]"
            priority
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-4 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        
        {/* Name with Role Badge */}
        <div className="flex items-center justify-center gap-2">
          <p className="font-medium text-slate-300">{name}</p>
          <span className="text-slate-500">•</span>
          <span className="font-medium text-blue-300">{role}</span>
        </div>

        {/* Description */}
        {description && (
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}

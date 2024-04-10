


interface FmCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}


function FmCard({ title, subtitle, children }: FmCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-500 mt-2">{subtitle}</p>
            <div className="mt-4">{children}</div>
        </div>
    );
}

export default FmCard;
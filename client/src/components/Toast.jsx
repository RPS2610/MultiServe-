import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    Info,
    X,
} from "lucide-react";

function Toast({ toast, onClose }) {
    if (!toast) return null;

    const styles = {
        success: {
            icon: CheckCircle2,
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            titleColor: "text-emerald-900",
            bar: "bg-emerald-500",
        },

        error: {
            icon: XCircle,
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            titleColor: "text-red-900",
            bar: "bg-red-500",
        },

        warning: {
            icon: AlertCircle,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            titleColor: "text-amber-900",
            bar: "bg-amber-500",
        },

        info: {
            icon: Info,
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
            titleColor: "text-indigo-900",
            bar: "bg-indigo-500",
        },
    };

    const currentStyle =
        styles[toast.type] || styles.success;

    const Icon = currentStyle.icon;

    return (
        <div className="fixed right-4 top-4 z-[9999] w-[calc(100%-2rem)] max-w-[390px] sm:right-6 sm:top-6">

            <div className="relative overflow-hidden rounded-2xl border border-[#e8e5f0] bg-white shadow-[0_20px_50px_rgba(20,15,60,0.16)]">

                <div className="flex items-start gap-3 p-4">

                    {/* Icon */}
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${currentStyle.iconBg}`}
                    >
                        <Icon
                            size={23}
                            className={currentStyle.iconColor}
                        />
                    </div>

                        <h4
                            className={`text-sm font-bold ${currentStyle.titleColor}`}
                        >
                            {toast.title}
                        </h4>

                        <p className="mt-1 text-sm leading-5 text-[#6b6878]">
                            {toast.message}
                        </p>

                    </div>

                    {/* Close */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#9693a3] transition hover:bg-[#f4f1ff] hover:text-[#3525cd]"
                        aria-label="Close notification"
                    >
                        <X size={17} />
                    </button>

                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-[#f0edf7]">

                    <div
                        className={`h-full ${currentStyle.bar} animate-[toastProgress_4s_linear_forwards]`}
                    />

                </div>

            </div>

        </div>
    );
}

export default Toast;
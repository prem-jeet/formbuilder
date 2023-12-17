import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseFill } from "react-icons/ri";
type Props = {
  children: React.ReactNode;
  header: string;
  isVisible: boolean;
  onClose: () => void;
};

export const RightOverlay = ({
  children,
  header,
  isVisible,
  onClose,
}: Props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="overlay-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="h-full w-full absolute animate-in fade-in top-0 left-0 bg-slate-400 bg-opacity-20"
            onClick={onClose}
          ></div>
          <div className="absolute top-0 flex flex-col right-0 h-full w-1/4 shadow-xl rounded-lg p-4 overflow-x-hidden overflow-y-auto bg-white space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium">{header}</span>
              <button
                className="btn btn-ghost btn-circle btn-sm text-xl"
                onClick={onClose}
              >
                <RiCloseFill />
              </button>
            </div>
            <div className=" flex-grow overflow-auto flex flex-col">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

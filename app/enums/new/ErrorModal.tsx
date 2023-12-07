"use client";
import React, { DialogHTMLAttributes, Ref, useEffect, useRef } from "react";
import { BsDot } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";

type Props = {
  errors: { [key: string]: string[] };
  isModalOpen: boolean;
  onClose: () => void;
};

export const ErrorModal = ({ errors, isModalOpen, onClose }: Props) => {
  const ref = useRef(null);
  useEffect(() => {
    const modal = ref.current;
    if (isModalOpen) {
      // @ts-expect-error
      modal.showModal();
    }
  }, [isModalOpen]);
  return (
    <dialog id="enum_form_error_modal" className="modal" ref={ref}>
      <div className="modal-box bg-red-50">
        <h3 className="text-3xl text-black font-bold">Form Error</h3>
        <div className="space-y-4 mt-6">
          {Object.keys(errors).map((label) => (
            <div key={label}>
              <span className="flex items-center space-x-2">
                <CiWarning className="text-error" />
                <p className="text-zinc-800 font-semibold text-xl">
                  {label.toUpperCase()}
                </p>
              </span>
              <ul className="text-rose-900 text-lg font-bold px-5">
                {errors[label].map((error) => (
                  <span key={error} className="flex items-center">
                    <BsDot />
                    <li>{error}</li>
                  </span>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn bg-red-950 text-white hover:bg-red-900 hover:text-white"
              onClick={() => onClose()}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

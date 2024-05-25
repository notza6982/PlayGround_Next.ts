import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import clsx from "clsx";
import LoadingData from "../loadingdata";

interface ModalProps {
    isOpen:boolean;
    title?:string;
    body?: React.ReactElement;
    onClose: () => void;
    defaultHeader?: boolean;
    header?: React.ReactElement;
    width?:number;
    height?:number;
    borderRadius?:number;
    isLoading?:boolean;
    isDividerHeader?:boolean;
}

const Modal:React.FC<ModalProps> = ({
    isOpen,
    title,
    body,
    onClose,
    defaultHeader = true,
    header,
    width,
    height,
    borderRadius,
    isLoading,
    isDividerHeader = false,
}) => {

    // const [isLoading, setIsLoading] = useState<boolean>(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
            
    //         setIsLoading(false);
    //     }, 700);
    
    //     setIsLoading(true)
    //     return () => clearTimeout(timer);
    //   }, [isOpen]);

   return ((
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[10000]" onClose={onClose}
                >
                    <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                               <Dialog.Panel 
                                    style={{
                                        width: width ? `${width}px`: '680px',
                                        height: height ? `${height}px` : 'auto',
                                        borderRadius: borderRadius ? `${borderRadius}px` : '16px' 
                                    }}
                                    className={clsx(
                                        "transform overflow-hidden bg-[#F6F7F9] p-[16px] text-left align-middle shadow-xl transition-all"
                                    )}>
                                        {isLoading ?  
                                            <div className={clsx(
                                                    "w-full pt-4 mb-4 flex justify-center items-center",
                                                    !isOpen ? "invisible" : ""
                                            )}>
                                                <LoadingData />
                                            </div>:
                                            <>
                                                {/* Title Modal */}
                                                {defaultHeader ? 
                                                    <div className="flex flex-row items-center justify-between">
                                                        <Dialog.Title className="text-[16px] font-semibold text-[#344054]">
                                                            <div className="flex flex-row">
                                                                {title}
                                                            </div>
                                                        </Dialog.Title>
                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center rounded-md px-4 py-2"
                                                            onClick={onClose}
                                                        >
                                                            <Image
                                                                alt="Cross"
                                                                className="cursor-pointer"
                                                                height="14"
                                                                width="14"
                                                                src="/images/Cross.png"
                                                                unoptimized
                                                            />
                                                        </button>
                                                    </div> : 
                                                    <>
                                                        {header}
                                                    </>
                                                }
                                                
                                                {/* Title Modal */}
                                                {isDividerHeader &&  <div className="w-full border-b-2 mt-4 border-[#E4E7EC]" />}
                                                <div className="w-full mt-4 max-h-[400px] overflow-y-auto">
                                                    {body}
                                                </div>
                                            </>
                                        }
                                        
                                    </Dialog.Panel>
                     
                              
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
          ))
}

export default Modal;
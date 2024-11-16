import React from 'react';
import { useAlert } from '../../../contexts/alertContext'
import './alert.css';

const Alert = () => {
  const { alertMessage, alertType } = useAlert();

  if (!alertMessage) return null;

  const alertStyles = {
    success: 'bg-green-50 text-green-400',
    warning: 'bg-yellow-50 text-yellow-400',
    error: 'bg-red-50 text-red-400',
    info: 'bg-blue-50 text-blue-400',
  };

  const iconPaths = {
    success: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
    warning: 'M8.257 3.099c.366-.741 1.419-.741 1.785 0l5.516 11.172c.334.678-.167 1.482-.893 1.482H3.634c-.726 0-1.227-.804-.893-1.482L8.257 3.1zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-.25-3.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z',
    error: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 10.707l-2 2a.999.999 0 01-1.414-1.414l2-2-2-2a.999.999 0 011.414-1.414l2 2 2-2a.999.999 0 011.414 1.414l-2 2 2 2a.999.999 0 11-1.414 1.414l-2-2z',
    info: 'M18 13a8 8 0 11-16 0 8 8 0 0116 0zm-7.25-6a.75.75 0 10-1.5 0v1.5a.75.75 0 001.5 0V7zm-1.5 3.75a.75.75 0 10-1.5 0v3.5a.75.75 0 101.5 0v-3.5z',
  };

  const textStyles = {
    success: 'text-[#15803d]',
    warning: 'text-[#b67418]',
    error: 'text-[#b91c1c]',
    info: 'text-[#1d4ed8]',
  };

  return (
    <div className="content-alert cursor-default">
        <div className={`alert ${alertStyles[alertType]} my-alert`} >
            <div className="flex">
            <div className="flex-shrink-0">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
                >
                <path fillRule="evenodd" d={iconPaths[alertType]} clipRule="evenodd" />
                </svg>
            </div>
            <div className="ml-3">
                <p className={`text-sm font-medium whitespace-pre-wrap ${textStyles[alertType]}`}>
                {alertMessage}
                </p>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Alert;

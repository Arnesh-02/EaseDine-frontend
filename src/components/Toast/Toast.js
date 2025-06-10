import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from '../../store/uiSlice';
import './Toast.css';

const Toast = () => {
  const dispatch = useDispatch();
  const { toast } = useSelector((state) => state.ui);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type} ${toast.message ? 'show' : ''}`}>
      <p>{toast.message}</p>
    </div>
  );
};

export default Toast;

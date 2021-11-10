import { useLocation } from 'react-router-dom';

export default function ApiSearch(param) {
  const location = useLocation();
  if (!param) return '';
  const value = new URLSearchParams(location.search).get(param);
  return (value === undefined) ? '' : value;
}
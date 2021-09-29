import {useLocation} from 'react-router'
import routes from 'routes'
import {useEffect,useState} from 'react'

export default function usePageViews() {
  let location = useLocation();
  const [pathname,setPathName]=useState("")
  const [key,setKey]=useState("")
  useEffect(() => {
  routes.map((route,key)=>{ 
      if(`${ route.layout}${route.path}`=== location.pathname){

        setPathName(route.name)
        setKey(key)
      } 
      return null;
  })
  }, [location]);
  return [pathname,key];
}
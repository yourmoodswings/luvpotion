import {createContext,useContext,useEffect,useState} from 'react';
import {getSharedContent,sharedRequired} from '@/lib/sharedApi';
const Content=createContext(null);
export function ContentProvider({children}){const [content,setContent]=useState(null),[error,setError]=useState('');useEffect(()=>{let active=true;getSharedContent().then(data=>{if(active)setContent(data);}).catch(e=>{if(active)setError(e.message);});return()=>{active=false;};},[]);if(error)return <main style={{padding:'10%'}}><h1>The collection is temporarily unavailable.</h1><p>{error}</p><button onClick={()=>window.location.reload()}>Try again</button></main>;if(sharedRequired&&!content)return <main style={{padding:'10%'}}>Opening LUVPOTION…</main>;return <Content.Provider value={content}>{children}</Content.Provider>;}
export const useContent=()=>useContext(Content);

import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'



export const Search = () => {
    const [keyword,setKeyword]=useState("")
    const navigate =useNavigate();
    const searchHandler=(e)=>{
        e.preventDefault();

        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }
        else{
            navigate("/")
        }
    }

  return (
    <form onSubmit={searchHandler}>
    
    <div className="input-group">
                        <input type="text" id="search_field" class="form-control" placeholder="Buscar productos..." 
                        onChange={(e)=> setKeyword(e.target.value)}
                        />
                        <div class="input-group-append">
                            <button id="search_btn" className="button"><i class="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    </form>

  )
}

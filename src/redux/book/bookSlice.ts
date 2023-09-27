import {PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IBook {
    publicationDate:number,
    keywords:string;
    filterOptions:string[];
}

const initialState: IBook = {
    publicationDate:2023,
    keywords:"",
    filterOptions:[]

};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setYear: (state, action:PayloadAction<number>) => {
      state.publicationDate = action.payload;
    },
    filter:(state,action)=>{
      state.filterOptions=action.payload;
    },
    search: (state, action) => {
      state.keywords = action.payload;
    },
    clearFilter: (state) => { 
      state.keywords=''
      state.filterOptions=[]
    }

  }
});

export const {setYear,filter,search,clearFilter}=bookSlice.actions
export default bookSlice.reducer;
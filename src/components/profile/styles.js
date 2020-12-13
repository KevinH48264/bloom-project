import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

// NavBar
export const ProfileContainer = styled.div`
    display: flex; 
    flex-direction: column;
    width: 100%; 
    justify-content: center;
    align-items: center;
    background-color: rgba(35, 181, 165, 0.5);
`

export const ProfileInner = styled.div`
    margin: 75px 100px 100px 100px;
    width: 90%;
    display: flex;
    align-items: center; 
    flex-direction: column;
    background-color: white;
`

export const ProfileTitle = styled.div`
    justify-content: center; 
    align-items: center; 
    height: 200px;
    font-size: 36px;
`

export const ProfileInfo = styled.div`
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    height: 400px;
    width: 100%;
`

export const ProfileInfoTag = styled.div`
    justify-content: flex-end; 
    align-items: center; 
    /* width: 45%; */
`

export const ProfileInfoResponse = styled.div`
    justify-content: flex-start; 
    align-items: center; 
    /* width: 50%; */
`

export const ProfileComments = styled.div`
    justify-content: center; 
`

export const AddComments = styled.div`
    justify-content: center; 
`

export const Line = styled.div`
    background-color: rgba(35, 181, 165, 1);
    height: 2px;
    width: 80%;
`

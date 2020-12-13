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
    font-size: 36px;
`

export const ProfileInner = styled.div`
    margin: 75px 100px 100px 100px;
    width: 90%;
    display: flex;
    align-items: center; 
    flex-direction: column;
    background-color: white;
    padding-bottom: 100px;
`

export const ProfileTitle = styled.div`
    justify-content: center; 
    align-items: center; 
    margin-top: 50px;
`

export const ProfileInfo = styled.div`
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    /* height: 400px; */
    width: 100%;
    font-size: 24px;
`

export const ProfileInfoRow = styled.div`
    justify-content: space-between; 
    align-items: center; 
    margin: 10px 0px 10px 0px;
`

export const ProfileInfoTag = styled.div`
    justify-content: flex-end; 
    align-items: center; 
    width: 500px;
    margin-right: 20px;
`

export const ProfileInfoResponse = styled.div`
    justify-content: flex-start; 
    align-items: center; 
    width: 500px;
    margin-left: 20px;
`

export const ProfileComments = styled.div`
    justify-content: center; 
    width: 100%;
    flex-direction: column;
`

export const AddComments = styled.div`
    justify-content: center; 
    flex-direction: column;
`

export const Line = styled.div`
    background-color: rgba(35, 181, 165, 1);
    height: 2px;
    width: 80%;
    margin: 50px 0px 50px 0px;
`

export const Button = styled.button`
    background-color: #23B5A5;
    margin: 20px;
    font-size: 24px;
    border: none;
    padding: 14px 30px;
    overflow: hidden;
    transition: 1s all ease;

    color: white;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    text-align: center;

    .hover {
        background: #25af9fad;
    }
`

export const CommentTable = styled.table`
    max-width: 90%;
    border-collapse: collapse;
    border: none;
    font-size: 24px;
    table-layout: fixed;
`

export const Comment = styled.td`
    border: none;
    border-collapse: collapse;
    padding: 10px;
    max-width: 500px;
    table-layout: fixed;
    word-break: break-all;
`
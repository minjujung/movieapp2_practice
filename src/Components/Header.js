import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { RiHome4Fill, RiMovie2Fill, RiVideoLine, RiSearchLine } from "react-icons/ri";

const List = styled.ul`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = styled.header`
    color: white;
    display: flex;
    width: 100%;
    height: 70px;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(30, 30, 30, 0.8);
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`; 

const SLink = styled(Link)`
    text-decoration: none;
    font-size: 30px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const Item = styled.li`
    width: 100px;
    color : ${props => props.current ? "#e55039" : "#aaa69d"};
    transition : color 0.3s ease-in-out;
    border-bottom : 3px solid ${props => props.current ? "#e55039" : "transparent" };
    transition : border-bottom 0.3s ease-in-out;
`;

const appHeader = ({ location : { pathname }}) => {
    return (
        <Header>
            <List>
                <Item current={pathname === "/"}><SLink to="/"><RiHome4Fill /></SLink></Item>
                <Item current={pathname === "/movie"}><SLink to="/movie"><RiMovie2Fill /></SLink></Item>
                <Item current={pathname === "/tv"}><SLink to="/tv"><RiVideoLine /></SLink></Item>
                <Item current={pathname === "/search"}><SLink to="/search"><RiSearchLine /></SLink></Item>
            </List>
        </Header>
    );
}

export default withRouter(appHeader);
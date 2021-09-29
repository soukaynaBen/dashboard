//material-ui icons
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Unarchive from "@material-ui/icons/Unarchive";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
//core component:/views 
import Overview from "views/Overview.js"
import Tickets from "views/Tickets"
import Ideas from "views/Ideas"
import Contacts from "views/Contacts"
import Agents from "views/Agents"
import Articles from "views/Articles"
import Settings from "views/Settings"
import Subscription from "views/Subscription"


const dashboardRoutes=[
        {
            path:"/overview",
            name:"Overview",
            rtlName: "لوحة القيادة",
            icon:<ConfirmationNumberIcon color='inherit'/>,
            component:Overview,
            layout:"/admin",
        },
        {
            path:"/tickets",
            name:"Tickets",
            rtlName: "ملف تعريفي  للمستخدم ",
            icon:<Unarchive color='inherit'/>,
            component:Tickets,
            layout:"/admin",
        },
        {
            path:"/ideas",
            name:"Ideas",
            rtlName: "قائمة الجدول",  
            icon:<EmojiObjectsIcon color='inherit'/>,
            component:Ideas,
            layout:"/admin",
        },
        {
            path:"/contacts",
            name:"Contacts",
            rtlName: "طباعة",
            icon:<PeopleIcon color='inherit'/>,
            component:Contacts,
            layout:"/admin",
        },
        {
            path:"/agents",
            name:"Agents",
            rtlName: "الرموز",
            icon:<PersonIcon color='inherit'/>,
            component:Agents,
            layout:"/admin",
        },
        {
            path:"/articles",
            name:"Articles",
            rtlName: "خرائط",
            icon:<AssignmentIcon color='inherit'/>,
            component:Articles,
            layout:"/admin",
        },
        {
            path:"/settings",
            name:"Settings",
            rtlName: "إخطارات",
            icon:<SettingsIcon color='inherit'/>,
            component:Settings,
            layout:"/admin",
        },
        {
            path:"/subscription",
            name:"Subscription",
            rtlName: "دعم",
            icon:<CardMembershipIcon color='inherit'/>,
            component:Subscription,
            layout:"/admin",
        },
    ]


export default dashboardRoutes;

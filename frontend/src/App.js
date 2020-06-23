// import React from 'react';
// import styled from 'styled-components';
// import { StylesProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import {
//   Root,
//   getHeader,
//   getContent,
//   getDrawerSidebar,
//   getSidebarContent,
//   getFooter,
//   getSidebarTrigger,
//   getCollapseBtn,
//   getContentBasedScheme
// } from '@mui-treasury/layout';
// import NavigationContent from './components/NavigationContent'

// const Header = getHeader(styled);
// const Content = getContent(styled);
// const DrawerSidebar = getDrawerSidebar(styled);
// const SidebarContent = getSidebarContent(styled);
// const Footer = getFooter(styled);
// const SidebarTrigger = getSidebarTrigger(styled);
// const CollapseBtn = getCollapseBtn(styled);

// const contentBasedScheme = getContentBasedScheme();

// const App = () => {
//   return (
//     <StylesProvider injectFirst>
//       <CssBaseline />
//       <Root scheme={contentBasedScheme}>
//         {({ state: { sidebar } }) => (
//           <>
//             <Header>
//               <Toolbar>
//                 <SidebarTrigger sidebarId="primarySidebar" />
//               </Toolbar>
//             </Header>
//             <DrawerSidebar sidebarId="primarySidebar">
//               <SidebarContent>
//                 <NavigationContent setOpened={sidebar.primarySidebar.setOpened}/>
//               </SidebarContent>
//               <CollapseBtn />
//             </DrawerSidebar>
//             <Content>
//             </Content>
//             <Footer>
//             </Footer>
//           </>
//         )}
//       </Root>
//     </StylesProvider>
//   );
// };

// export default App;
// 

import React from 'react';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <Dashboard/>
  );
};

export default App;
/*
 * @Author: Cookie
 * @Date: 2021-07-18 15:58:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-20 11:36:04
 * @Description:
 */

import routes from '@/router';
import { useRoutes } from 'react-router-dom';

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;

import Section1Destructuring from '../sections/Section1Destructuring'
import Section2Reference from '../sections/Section2Reference'
import Section3Logical from '../sections/Section3Logical'
import Section4Class from '../sections/Section4Class'
import Section5Functions from '../sections/Section5Functions'
import Section6Async from '../sections/Section6Async'
import Section7Module from '../sections/Section7Module'
import Section8Dom from '../sections/Section8Dom'
import Section9Storage from '../sections/Section9Storage'
import Section10UseState from '../sections/Section10UseState'
import Section11UseEffect from '../sections/Section11UseEffect'
import Section12UseRef from '../sections/Section12UseRef'
import Section13UseContext from '../sections/Section13UseContext'
import Section14UseMemoCallback from '../sections/Section14UseMemoCallback'
import Section15ReactRouter from '../sections/Section15ReactRouter'

export const routeGroups = [
  {
    label: 'Javascript',
    routes: [
      { path: 'js/destructuring', label: '1. Destructuring', element: <Section1Destructuring /> },
      { path: 'js/reference', label: '2. Reference', element: <Section2Reference /> },
      { path: 'js/logical', label: '3. Toán tử logic', element: <Section3Logical /> },
      { path: 'js/class', label: '4. Class', element: <Section4Class /> },
      { path: 'js/functions', label: '5. Functions', element: <Section5Functions /> },
      { path: 'js/async', label: '6. Async', element: <Section6Async /> },
      { path: 'js/module', label: '7. Module', element: <Section7Module /> },
      { path: 'js/dom', label: '8. DOM', element: <Section8Dom /> },
      { path: 'js/storage', label: '9. Storage', element: <Section9Storage /> },
    ],
  },
  {
    label: 'React Hooks & Router',
    routes: [
      { path: 'react/use-state', label: '10. useState', element: <Section10UseState /> },
      { path: 'react/use-effect', label: '11. useEffect', element: <Section11UseEffect /> },
      { path: 'react/use-ref', label: '12. useRef', element: <Section12UseRef /> },
      { path: 'react/use-context', label: '13. useContext', element: <Section13UseContext /> },
      { path: 'react/use-memo-callback', label: '14. useMemo & useCallback', element: <Section14UseMemoCallback /> },
      { path: 'react/router', label: '15. React Router', element: <Section15ReactRouter /> },
    ],
  },
]

export const allRoutes = routeGroups.flatMap((group) => group.routes)

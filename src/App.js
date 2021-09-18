import styled from 'styled-components';
import data from './data.json';
import { useTable, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import VirtualScroll from 'virtual-scroll';
import { useEffect, useRef } from 'react';
import CustomScroll from 'react-custom-scroll';
import WheelIndicator from 'wheel-indicator';
import LocomotiveScroll from 'locomotive-scroll';
import Smooth from 'smooth-scrolling';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import { Rows } from './rows';
import Indicators from '@better-scroll/indicators';
import {ScrollSensor} from 'scroll-sensor';
//import IScroll from 'iscroll/build/iscroll-probe';
import IScroll from './iScroll/iScroll';



//BScroll.use(Indicators)
//BScroll.use(ScrollBar);


let overflow = 'auto'
const groupData = data => {
  const groupedData = data.reduce((acc, cur) => {
    if(!acc[cur.age]) acc[cur.age] = [];
    acc[cur.age].push(cur);

    return acc;
  }, {});

  const sortedData = Object
    .entries(groupedData)
    .sort((entryA, entryB) => entryA[0] - entryB[0]);

  const groupCounts = sortedData.map(([key, values]) => values.length + 1);
  const tableData = sortedData
    .map(([key, value]) => {
      return [
        {
          name: key,
          groupRow: true,
        },
        ...value,
      ];
    })
    .flat();
  
  return { groupCounts, tableData };
};

const columns = [
  // {
  //   Header: 'Age',
  //   accessor: 'age',
  // },
  {
    id: 'name',
    Header: 'Name',
    accessor: 'name',
    sticky: 'left',
    width: 100,
  },
  {
    id: 'email',
    Header: 'email',
    accessor: 'email',
    width: 300,
    //sticky: 'left',
  },
  {
    id: 'name2',
    Header: 'Name 2',
    accessor: 'name',
  },
  {
    id: 'email2',
    Header: 'email 2',
    accessor: 'email',
    width: 300,
  },
  {
    id: 'name3',
    Header: 'Name 3',
    accessor: 'name',
    width: 300,
  },
  {
    id: 'email3',
    Header: 'email 3',
    accessor: 'email',
    width: 300,
  },
];

export const App = () => {
  const {tableData, groupCounts} = groupData(data.slice(0, 100));
  const ref = useRef();
  const headerRef = useRef();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useBlockLayout,
    useSticky,
  );
  useEffect(() => {
    // ref.current.addEventListener('touchmove', (event) => {
    //   console.log('12');
    //   //event.preventDefault();
    //   //event.stopPropagation()
    // });
    

    let virtualX = 0;
    const el = ref.current;
    const scrollWidth = 1450 - document.body.clientWidth;
    // better scroll
    // const bs = new BScroll(el, {
    //   scrollX: true,
    //   scrollY: false,
    //   bounce: false,
    //   disableTouch: false,
    //   mouseWheel: true,
    //   indicators: [
    //     {
    //       relationElement: headerRef.current,
    //       interactive: false,
    //       ratio: 1,
    //     },
    //   ]
    // });
    // const hooks = bs.scroller.actionsHandler.hooks;
    // hooks.on('coordinateTransformation', (transformateDeltaData) => { 
    //   console.log(transformateDeltaData);
    // });
    // bs.scroller.scrollBehaviorX.hooks.on('momentum', (momentumData, distance) => {
    //   console.log(momentumData,distance);
    // });
    // const hooks = bs.scroller.translater.hooks
    // hooks.on('beforeTranslate', (transformStyle, point) => {
    //   console.log(transformStyle) // ['translateX(0px)', 'translateY(0px)', 'scale(1.2)']
    //   console.log(point) // { x: 0, y: 0 }
    //   return;
    // });

    // hooks.on('move', ({ deltaX, deltaY, e }) => {
    //   console.log(e);
    // });
    
    // better scroll ends

    //scroll sensor

    // const scrollSensor = new ScrollSensor({
    //   element: el,
    // });
    // const run = () => {
    //   requestAnimationFrame(() => {
    //     ref.current.scrollTo(virtualX, 0);
    //     headerRef.current.scrollTo(virtualX, 0);
    //     run();
    //   });
    // };
    // scrollSensor.on('scroll', event => {
    //   //console.log(event);
    //   const delta = event.scrollX * 1;
    //   if(virtualX === 0 && virtualX === scrollWidth) return;
    //   if(delta === 0) return;
    //   virtualX = virtualX + delta;
    //   if(virtualX < 0) virtualX = 0;
    //   if(virtualX > scrollWidth) virtualX = scrollWidth;

    //   //console.log(virtualX);
    // });
    // run();

    //scroll sensor

    //iscroll
    const iscroller = new IScroll(el, {
      disableMouse: true,
      bounce: true, // disable bounce because we're already customizing positioning
      scrollX: true,
      freeScroll: false,
      probeType: 3,
      preventDefault: false,
      interactiveScrollbars: false,
      keyBindings: true,
      eventPassthrough: 'vertical',
    });
    // iscroller.on('scroll', (event) => {
    //   console.log(event);
    // });
    //iscroll ends

    // el.addEventListener('touchmove', e => {
    //   console.log(e);
    //   e.preventDefault();
    // }, { passive: false });
    //const scrollWidth = 1450 - document.body.clientWidth;
    // const scroller = new VirtualScroll({
    //   el,
    //   touchMultiplier: 1,
    //   mouseMultiplier: 1,
    // });
    // console.log(scrollWidth, el.scrollWidth, document.body.clientWidth);
    // scroller.on(event => {
    //   const delta = event.deltaX * -1;
    //   if(virtualX === 0 && virtualX === scrollWidth) return;
    //   if(delta === 0) return;
    //   virtualX = virtualX + delta;
    //   if(virtualX < 0) virtualX = 0;
    //   if(virtualX > scrollWidth) virtualX = scrollWidth;

    //   ref.current.scrollTo(virtualX, 0);
    //   headerRef.current.scrollTo(virtualX, 0);
    // });

    //locomotive
    // const scroll = new LocomotiveScroll({
    //   el,
    //   smooth: true,
    //   direction: 'horizontal',
    // });

    // scroll.on('scroll', (e) => {
    //   console.log(e);
    // });
    // locomotive ends

    // wheel indicator
    // const indicator = new WheelIndicator({
    //   elem: ref.current,
    //   preventMouse:false,
    //   callback: function(e){
    //     console.log(e) // "up" or "down"
    //   }
    // });
    // indicator.turnOn();
    // wheel inidicator ends

    // smooth scrolling
    // const smooth = new Smooth({
    //   native: false,
    //   section: el,
    //   //ease: 0.1,
    // })
    
    // smooth.init();
    // smooth.on('scroll', (e) => {
    //   console.log(e);
    // });
    // smooth scrolling ends

    //return () => scroller.destroy();
  }, [ref]);

  // Render the UI for your table
  return (
    <Styles>
      <div style={{height: 100}}>Before table</div>
      <ScrollSync enabled={false}>
        <div {...getTableProps()} className="table sticky" style={{  }}>
          <ScrollSyncPane>
            <div className={"header"} ref={headerRef}>
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
                      {column.render('Header')}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollSyncPane>
          <ScrollSyncPane>
            <div >
              <div ref={ref}  className={"body"} {...getTableBodyProps()} >
                <Rows virutal rows={rows} prepareRow={prepareRow}/>
              </div>
            </div>
          </ScrollSyncPane>
        </div>
      </ScrollSync>
    </Styles>
  );
}


const Styles = styled.div`

  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      &.group {
        background-color: wheat;
        position: sticky;
        top: 30px;
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }
    }

    &.sticky {
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
        overflow: hidden;
      }

      .header {
        top: 0;
        width: 100%;
        background-color: #fff;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
        overflow-x: hidden;
        overflow-y: hidden;
      }

      .group {
        z-index: 5;
        [data-sticky-td] {
          background-color: wheat;
        }
      }

      [data-sticky-td] {
        position: sticky;
        background-color: #fff;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;

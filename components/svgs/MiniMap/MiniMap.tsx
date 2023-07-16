import React from 'react';
import styles from './MiniMap.module.scss';

export interface IMiniMap {
    houseName:
        | 'reds1'
        | 'reds2'
        | 'reds'
        | 'platinum'
        | 'gold'
        | 'purple'
        | 'whites'
        | 'whites1'
        | 'whites2'
        | 'brown'
        | 'green'
        | 'silver'
        | string;
    setActiveHouse?: any;
    theme: 'light' | 'dark';
    separation?: boolean;
}

const MiniMap: React.FC<IMiniMap> = ({ houseName, setActiveHouse, theme, separation }) => {
    return (
        <div className={`${styles[theme]} ${styles.mapSvg}`}>
            <svg id='_Слой_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2159 1109'>
                <g className={styles.base}>
                    <path
                        d='M2157.2,597.58c.09,4.76-3.88,10.34-16.59,16.34l-128.55,59.11c-68.27,30.05-99.04,19.89-135.71,20l-199.33-15s-68.24-6-148.82,10.25c-71.58,14.39-172.1,70-172.1,70l-165.19,87.8-89,43.95-325.61,153.87c-26.38,13.63-42.69,8.22-52.84,2.32l-55.13-38.67c-6.68-5.87-24-10.78-48-2.87l-368.73,98c-20.63,5.57-28.3,8.18-44.55-14.43L11.39,854.52c-6.3-7.13-9.43-14.7-9.71-22.25v-.1c-.78-20.2,21.37-34.67,55.43-45.3L1771.5,314.5l241.18,172.04c10.19,9.21,43.25,33.85,43.25,33.85l91.33,63.91c3.65,2.72,9.84,7.33,9.94,13.16v.12Z'
                        fill='#4a4f5a'
                    />
                    <path
                        d='M1771.5,314.5L57.11,786.87c-34.06,10.63-56.21,25.1-55.43,45.3v.1c.28,7.55,3.41,15.12,9.71,22.25l195.66,233.73c16.25,22.61,23.92,20,44.55,14.43l368.73-98c24-7.91,41.32-3,48,2.87l55.13,38.67c10.15,5.9,26.46,11.31,52.84-2.32l325.61-153.87,89-43.95,165.19-87.8s100.52-55.61,172.1-70c80.58-16.25,148.82-10.25,148.82-10.25l199.33,15c36.67-.11,67.44,10.05,135.71-20l128.55-59.11c12.71-6,16.68-11.58,16.59-16.34v-.12c-.1-5.83-6.29-10.44-9.94-13.16l-91.33-63.91s-33.06-24.64-43.25-33.85l-241.18-172.04Z'
                        fill='none'
                        stroke='#777a80'
                        strokeMiterlimit='10'
                        strokeWidth='8'
                    />
                </g>
                <g id='Build' className={`${styles.standartBuilding} ${styles.standartBuildingNoCursor}`}>
                    <g>
                        <polygon
                            points='1978.24 240.67 1978.24 504.7 1899.23 530.44 1903 253 1965.49 234 1965.49 230 1978.24 240.67'
                            fill='#606571'
                        />
                        <polygon points='1965.49 230 1965.49 234 1903 253 1903 230 1965.49 208.5 1965.49 230' fill='#606571' />
                        <polygon points='1910.5 136 1965.49 208.5 1903 230 1833 164.5 1777.2 84.5 1840 63.5 1910.5 136' fill='#606571' />
                        <polygon points='1903 230 1903 253 1833 185.5 1833 164.5 1903 230' fill='#606571' />
                        <polygon points='1903 253 1899.23 530.44 1823.05 456.45 1827.56 178 1833 185.5 1903 253' fill='#606571' />
                        <polygon points='1833 164.5 1833 185.5 1827.56 178 1777.2 108.58 1777.2 84.5 1833 164.5' fill='#606571' />
                        <polygon
                            points='1777.2 108.58 1827.56 178 1823.05 456.45 1768.44 375.32 1768.44 111.29 1777.2 108.58'
                            fill='#606571'
                        />
                    </g>
                    <g>
                        <polyline
                            points='1777.2 108.58 1768.44 111.29 1768.44 375.32 1823.05 456.45'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1777.2'
                            y1='108.58'
                            x2='1777.2'
                            y2='84.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1777.2'
                            y1='108.58'
                            x2='1827.56'
                            y2='178'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1823.05'
                            y1='456.45'
                            x2='1899.23'
                            y2='530.44'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1823.05'
                            y1='456.45'
                            x2='1827.56'
                            y2='178'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='1899.23 530.44 1978.24 504.7 1978.24 240.67 1965.49 230'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1899.23'
                            y1='530.44'
                            x2='1903'
                            y2='253'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='1965.49 208.5 1910.5 136 1840 63.5 1777.2 84.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1965.49'
                            y1='208.5'
                            x2='1903'
                            y2='230'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='1965.49 208.5 1965.49 230 1965.49 234 1903 253'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1777.2'
                            y1='84.5'
                            x2='1833'
                            y2='164.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1903'
                            y1='230'
                            x2='1833'
                            y2='164.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line x1='1903' y1='230' x2='1903' y2='253' fill='#606571' stroke='#777a80' strokeMiterlimit='10' strokeWidth='8' />
                        <line
                            x1='1833'
                            y1='164.5'
                            x2='1833'
                            y2='185.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1833'
                            y1='185.5'
                            x2='1903'
                            y2='253'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1833'
                            y1='185.5'
                            x2='1827.56'
                            y2='178'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                    </g>
                </g>
                <g
                    id='ThePurple'
                    className={houseName === 'purple' ? styles.activeBuilding : styles.standartBuilding}
                    onClick={() => {
                        if (theme === 'dark') setActiveHouse('purple');
                    }}
                >
                    <g>
                        <polygon
                            points='1458.05 33.88 1458.05 521.37 1437.65 526.75 1433.89 526.42 1430.29 528.69 1403.83 535.66 1403.83 499.26 1394.59 488.18 1394.59 392.93 1340.26 327.73 1331.13 330.14 1332 67.5 1458.05 33.88'
                            fill='#606571'
                        />
                        <polygon
                            points='1433.36 4.25 1458.05 33.88 1332 67.5 1322 66 1289.12 28.9 1393.33 1.43 1405.66 2.14 1412.09 9.86 1433.36 4.25'
                            fill='#606571'
                        />
                        <polygon points='1332 67.5 1331.13 330.14 1322 332.54 1322 66 1332 67.5' fill='#606571' />
                        <polygon points='1322 66 1322 332.54 1289.03 341.23 1288.97 38.56 1289.12 28.9 1322 66' fill='#606571' />
                    </g>
                    <g>
                        <polyline
                            points='1458.05 33.88 1458.05 521.37 1437.65 526.75 1433.89 526.42 1430.29 528.69 1403.83 535.66 1403.83 499.26 1394.59 488.18 1394.59 392.93 1340.26 327.73 1331.13 330.14'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='1458.05 33.88 1433.36 4.25 1412.09 9.86 1405.66 2.14 1393.33 1.43 1289.12 28.9'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1458.05'
                            y1='33.88'
                            x2='1332'
                            y2='67.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='1289.12 28.9 1288.97 38.56 1289.03 341.23 1322 332.54'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1289.12'
                            y1='28.9'
                            x2='1322'
                            y2='66'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line x1='1322' y1='66' x2='1332' y2='67.5' fill='#606571' stroke='#777a80' strokeMiterlimit='10' strokeWidth='8' />
                        <line
                            x1='1322'
                            y1='66'
                            x2='1322'
                            y2='332.54'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1332'
                            y1='67.5'
                            x2='1331.13'
                            y2='330.14'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1322'
                            y1='332.54'
                            x2='1331.13'
                            y2='330.14'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                    </g>
                </g>
                <g
                    id='ThePlatinum'
                    className={houseName === 'platinum' ? styles.activeBuilding : styles.standartBuilding}
                    onClick={() => {
                        if (theme === 'dark') setActiveHouse('platinum');
                    }}
                >
                    <g>
                        <polygon
                            points='1206.64 395.6 1206.64 559.5 1205.5 591 1165 603 1165 571.5 1156 561.5 1156 466 1118.5 420 1206.64 395.6'
                            fill='#606571'
                        />
                        <polygon
                            points='1202.23 390.31 1206.64 395.6 1118.5 420 1102 400 1078 406 1078 257 1202.23 224.23 1202.23 390.31'
                            fill='#606571'
                        />
                        <polygon points='1157.6 172.62 1202.23 224.23 1078 257 1034.23 206.13 1157.6 172.62' fill='#606571' />
                        <polygon points='1078 257 1078 406 1034.23 418.24 1034.23 206.13 1078 257' fill='#606571' />
                    </g>
                    <g>
                        <polyline
                            points='1206.64 395.6 1206.64 559.5 1205.5 591 1165 603 1165 571.5 1156 561.5 1156 466 1118.5 420'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='1206.64 395.6 1202.23 390.31 1202.23 224.23'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1206.64'
                            y1='395.6'
                            x2='1118.5'
                            y2='420'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='1202.23 224.23 1157.6 172.62 1034.23 206.13'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1202.23'
                            y1='224.23'
                            x2='1078'
                            y2='257'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='1034.23 206.13 1034.23 418.24 1078 406'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='1034.23'
                            y1='206.13'
                            x2='1078'
                            y2='257'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line x1='1078' y1='257' x2='1078' y2='406' fill='#606571' stroke='#777a80' strokeMiterlimit='10' strokeWidth='8' />
                        <polyline
                            points='1078 406 1102 400 1118.5 420'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                    </g>
                </g>
                <g
                    id='TheGold'
                    className={houseName === 'gold' ? styles.activeBuilding : styles.standartBuilding}
                    onClick={() => {
                        if (theme === 'dark') setActiveHouse('gold');
                    }}
                >
                    <g>
                        <polygon
                            points='956.85 458.91 956.85 633.93 951.56 638.41 951.56 650.96 920 659.28 915.23 659 915.23 653.23 907.78 652.39 907.78 625.62 901.5 621.17 901.5 590.82 818.34 531.95 818.34 402.5 946 369.64 946 445.9 956.85 458.91'
                            fill='#606571'
                        />
                        <polygon points='910.52 327.07 946 369.64 818.34 402.5 784.33 360.34 910.52 327.07' fill='#606571' />
                        <polygon points='818.34 402.5 818.34 531.95 784.33 547.54 784.33 360.34 818.34 402.5' fill='#606571' />
                    </g>
                    <g>
                        <polyline
                            points='784.33 360.34 784.33 547.54 818.34 531.95'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='784.33 360.34 910.52 327.07 946 369.64'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='784.33'
                            y1='360.34'
                            x2='818.34'
                            y2='402.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='946 369.64 946 445.9 956.85 458.91 956.85 633.93 951.56 638.41 951.56 650.96 920 659.28 915.23 659 915.23 653.23 907.78 652.39 907.78 625.62 901.5 621.17 901.5 590.82 818.34 531.95'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='946'
                            y1='369.64'
                            x2='818.34'
                            y2='402.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='818.34'
                            y1='531.95'
                            x2='818.34'
                            y2='402.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                    </g>
                </g>
                <g
                    id='TheReds'
                    className={
                        houseName === 'reds'
                            ? styles.activeBuilding
                            : houseName === 'reds1' || houseName === 'reds2'
                            ? ''
                            : styles.standartBuilding
                    }
                    onClick={() => {
                        if (theme === 'dark') setActiveHouse('reds');
                    }}
                >
                    <g
                        id='TheReds_S1'
                        className={houseName === 'reds1' ? styles.activeBuilding : houseName === 'reds' ? '' : styles.standartBuilding}
                    >
                        <g>
                            <polygon points='1417.01 662.15 1417.01 698.46 1318.21 724.51 1318.21 686.69 1417.01 662.15' fill='#ad7c53' />
                            <polygon
                                points='1411.24 655.23 1417.01 662.15 1318.21 686.69 1318.5 597.5 1411.24 573.49 1411.24 655.23'
                                fill='#ad7c53'
                            />
                            <polygon
                                points='1403.83 564.59 1411.24 573.49 1318.5 597.5 1318.5 520.78 1403.83 499.26 1403.83 564.59'
                                fill='#ad7c53'
                            />
                            <polygon
                                points='1394.59 488.18 1403.83 499.26 1318.5 520.78 1318.5 412.5 1394.59 392.93 1394.59 488.18'
                                fill='#ad7c53'
                            />
                            <polygon points='1340.26 327.73 1394.59 392.93 1318.5 412.5 1263.87 347.86 1340.26 327.73' fill='#ad7c53' />
                            <polygon
                                points='1318.5 520.78 1318.5 597.5 1254.84 521.97 1259.36 520.78 1259.36 451.21 1318.5 520.78'
                                fill='#ad7c53'
                            />
                            <polygon
                                points='1318.5 412.5 1318.5 520.78 1259.36 451.21 1263.87 450.02 1263.87 347.86 1318.5 412.5'
                                fill='#ad7c53'
                            />
                            <polygon
                                points='1254.84 521.97 1318.5 597.5 1318.21 686.69 1294.5 654.5 1291.5 651 1270.01 656.83 1254.84 638.63 1254.84 521.97'
                                fill='#ad7c53'
                            />
                        </g>
                        <g>
                            <polyline
                                points='1318.21 686.69 1318.21 724.51 1417.01 698.46 1417.01 662.15'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1318.21 686.69 1294.5 654.5 1291.5 651 1270.01 656.83 1254.84 638.63 1254.84 521.97'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1318.21'
                                y1='686.69'
                                x2='1318.5'
                                y2='597.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1318.21'
                                y1='686.69'
                                x2='1417.01'
                                y2='662.15'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1254.84 521.97 1259.36 520.78 1259.36 451.21'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1254.84'
                                y1='521.97'
                                x2='1318.5'
                                y2='597.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1259.36 451.21 1263.87 450.02 1263.87 347.86'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1259.36'
                                y1='451.21'
                                x2='1318.5'
                                y2='520.78'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1263.87 347.86 1340.26 327.73 1394.59 392.93'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1263.87'
                                y1='347.86'
                                x2='1318.5'
                                y2='412.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1394.59 392.93 1394.59 488.18 1403.83 499.26'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1394.59'
                                y1='392.93'
                                x2='1318.5'
                                y2='412.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1403.83 499.26 1403.83 564.59 1411.24 573.49'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1403.83'
                                y1='499.26'
                                x2='1318.5'
                                y2='520.78'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1411.24 573.49 1411.24 655.23 1417.01 662.15'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1411.24'
                                y1='573.49'
                                x2='1318.5'
                                y2='597.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1318.5'
                                y1='412.5'
                                x2='1318.5'
                                y2='520.78'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1318.5'
                                y1='520.78'
                                x2='1318.5'
                                y2='597.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                        </g>
                    </g>
                    <g id='Vector_3' className={houseName === 'reds1' || houseName === 'reds2' ? styles.standartBuilding : ''}>
                        <g>
                            <polyline
                                points='1318 688 1291.5 651 1174 683 1174 723.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeWidth='8'
                                className={houseName === 'reds' && separation ? styles.separation : ''}
                            />
                            <line
                                x1='1318'
                                y1='688'
                                x2='1174'
                                y2='723.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeWidth='8'
                                className={houseName === 'reds' && separation ? styles.separation : ''}
                            />
                            <polyline
                                points='1318 688 1318 724 1174 762.5 1174 723.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeWidth='8'
                                className={houseName === 'reds' && separation ? styles.separation : ''}
                            />
                        </g>
                    </g>
                    <g
                        id='TheReds_S2'
                        className={houseName === 'reds2' ? styles.activeBuilding : houseName === 'reds' ? '' : styles.standartBuilding}
                    >
                        <g>
                            <polygon points='1174.11 675.81 1174.11 762.5 1079.59 787.42 1079.59 700 1174.11 675.81' fill='#ad7c53' />
                            <polygon
                                points='1165.21 665.13 1174.11 675.81 1079.59 700 1079.59 593.5 1165.21 572 1165.21 665.13'
                                fill='#ad7c53'
                            />
                            <polygon
                                points='1155.97 560.92 1165.21 572 1079.59 593.5 1079.59 485 1155.97 465.67 1155.97 560.92'
                                fill='#ad7c53'
                            />
                            <polygon points='1101.64 400.47 1155.97 465.67 1079.59 485 1025.26 420.61 1101.64 400.47' fill='#ad7c53' />
                            <polygon points='1079.59 700 1079.59 787.42 1016.22 711.38 1016.22 624.69 1079.59 700' fill='#ad7c53' />
                            <polygon
                                points='1079.59 593.5 1079.59 700 1016.22 624.69 1020.74 623.5 1020.74 523.96 1079.59 593.5'
                                fill='#ad7c53'
                            />
                            <polygon
                                points='1079.59 485 1079.59 593.5 1020.74 523.96 1025.26 522.76 1025.26 420.61 1079.59 485'
                                fill='#ad7c53'
                            />
                        </g>
                        <g>
                            <polyline
                                points='1079.59 787.42 1016.22 711.38 1016.22 624.69'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1079.59 787.42 1174.11 762.5 1174.11 675.81'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1079.59'
                                y1='787.42'
                                x2='1079.59'
                                y2='700'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1016.22 624.69 1020.74 623.5 1020.74 523.96'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1016.22'
                                y1='624.69'
                                x2='1079.59'
                                y2='700'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1020.74 523.96 1025.26 522.76 1025.26 420.61'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1020.74'
                                y1='523.96'
                                x2='1079.59'
                                y2='593.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1025.26 420.61 1101.64 400.47 1155.97 465.67'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1025.26'
                                y1='420.61'
                                x2='1079.59'
                                y2='485'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1155.97 465.67 1155.97 560.92 1165.21 572'
                                fill='none'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1155.97'
                                y1='465.67'
                                x2='1079.59'
                                y2='485'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='1165.21 572 1165.21 665.13 1174.11 675.81'
                                fill='none'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1165.21'
                                y1='572'
                                x2='1079.59'
                                y2='593.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1174.11'
                                y1='675.81'
                                x2='1079.59'
                                y2='700'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1079.59'
                                y1='485'
                                x2='1079.59'
                                y2='593.5'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='1079.59'
                                y1='593.5'
                                x2='1079.59'
                                y2='700'
                                fill='#ad7c53'
                                stroke='#c99264'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                        </g>
                    </g>
                </g>
                <g
                    id='TheGreen'
                    className={houseName === 'green' ? styles.activeBuilding : styles.standartBuilding}
                    onClick={() => {
                        if (theme === 'dark') setActiveHouse('green');
                    }}
                >
                    <g>
                        <polygon points='729.18 537.33 729.18 666.16 657.55 615.45 640.5 623.26 640.5 561 729.18 537.33' fill='#606571' />
                        <polygon
                            points='723.45 530.45 729.18 537.33 640.5 561 634.5 553.5 634.5 418.5 723.45 394.69 723.45 530.45'
                            fill='#606571'
                        />
                        <polygon points='664.39 323.82 723.45 394.69 634.5 418.5 574.8 347.44 664.39 323.82' fill='#606571' />
                        <polygon
                            points='640.5 561 640.5 623.26 626.03 629.89 619.62 625.35 583.61 641.86 583.61 715.35 574.8 704.77 574.8 347.44 634.5 418.5 634.5 553.5 640.5 561'
                            fill='#606571'
                        />
                    </g>
                    <g>
                        <polyline
                            points='729.18 537.33 729.18 666.16 657.55 615.45 640.5 623.26'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='729.18 537.33 723.45 530.45 723.45 394.69'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='729.18'
                            y1='537.33'
                            x2='640.5'
                            y2='561'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='723.45 394.69 664.39 323.82 574.8 347.44'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='723.45'
                            y1='394.69'
                            x2='634.5'
                            y2='418.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='574.8 347.44 574.8 704.77 583.61 715.35 583.61 641.86 619.62 625.35 626.03 629.89 640.5 623.26'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='574.8'
                            y1='347.44'
                            x2='634.5'
                            y2='418.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <polyline
                            points='634.5 418.5 634.5 553.5 640.5 561'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                        <line
                            x1='640.5'
                            y1='561'
                            x2='640.5'
                            y2='623.26'
                            fill='#606571'
                            stroke='#777a80'
                            strokeMiterlimit='10'
                            strokeWidth='8'
                        />
                    </g>
                </g>
                <g
                    id='TheWhites'
                    className={
                        houseName === 'whites'
                            ? styles.activeBuilding
                            : houseName === 'whites1' || houseName === 'whites2'
                            ? ''
                            : styles.standartBuilding
                    }
                    onClick={() => {
                        if (theme === 'dark') setActiveHouse('whites');
                    }}
                >
                    <g
                        id='TheWhites_S2'
                        className={houseName === 'whites2' ? styles.activeBuilding : houseName === 'whites' ? '' : styles.standartBuilding}
                    >
                        <g>
                            <polygon points='921.49 834.43 921.49 881.39 853.96 912.34 853.96 866.34 921.49 834.43' fill='#606571' />
                            <polygon
                                points='921.49 834.43 853.96 866.34 847 860 847 802 914.64 770.93 914.64 829.58 921.49 834.43'
                                fill='#606571'
                            />
                            <polygon
                                points='914.64 770.93 847 802 840 796.5 840 625.62 876.5 610 876.5 639.5 907.78 625.62 907.79 766.08 914.64 770.93'
                                fill='#606571'
                            />
                            <polygon
                                points='907.78 625.62 876.5 639.5 876.5 610 869.5 604.5 901.5 590.82 901.5 621.17 907.78 625.62'
                                fill='#606571'
                            />
                            <polygon
                                points='901.5 590.82 869.5 604.5 876.5 610 840 625.62 757.24 567.43 782.35 555.92 782.35 548.45 818.34 531.95 901.5 590.82'
                                fill='#606571'
                            />
                            <polygon
                                points='853.96 866.34 853.96 912.34 831.98 896.88 831.98 866.34 765.83 819.51 746.57 828.33 746.52 789.32 750.83 787.33 750.83 593.25 757.24 590.31 757.24 567.43 840 625.62 840 796.5 847 802 847 860 853.96 866.34'
                                fill='#606571'
                            />
                        </g>
                        <g>
                            <polyline
                                points='853.96 912.34 831.98 896.88 831.98 866.34 765.83 819.51 746.57 828.33 746.52 789.32 750.83 787.33 750.83 593.25 757.24 590.31 757.24 567.43'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='853.96 912.34 921.49 881.39 921.49 834.43'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='853.96'
                                y1='912.34'
                                x2='853.96'
                                y2='866.34'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='921.49 834.43 914.64 829.58 914.64 770.93'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='921.49'
                                y1='834.43'
                                x2='853.96'
                                y2='866.34'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='914.64 770.93 907.79 766.08 907.78 625.62'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='914.64'
                                y1='770.93'
                                x2='847'
                                y2='802'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='907.78 625.62 901.5 621.17 901.5 590.82'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='907.78 625.62 876.5 639.5 876.5 610'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='901.5 590.82 818.34 531.95 782.35 548.45 782.35 555.92 757.24 567.43'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='901.5 590.82 869.5 604.5 876.5 610'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='757.24'
                                y1='567.43'
                                x2='840'
                                y2='625.62'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='840'
                                y1='625.62'
                                x2='876.5'
                                y2='610'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='840 625.62 840 796.5 847 802'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='847 802 847 860 853.96 866.34'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                        </g>
                    </g>
                    <g id='Vector_1' className={houseName === 'whites1' || houseName === 'whites2' ? styles.standartBuilding : ''}>
                        <g>
                            <polygon points='831.5 866.5 831.5 896.5 755 932 755 913.5 748 908 831.5 866.5' fill='#606571' />
                            <polygon points='831.5 866.5 748 908 748.5 849.5 741 843.5 741 831.5 766 819.5 831.5 866.5' fill='#606571' />
                        </g>
                        <g>
                            <polyline
                                points='831.5 866.5 766 819.5 741 831.5 741 843.5 748.5 849.5 748 908'
                                fill='#606571'
                                stroke='#777a80'
                                strokeWidth='8'
                            />
                            <polyline
                                points='831.5 866.5 831.5 896.5 755 932 755 913.5 748 908'
                                fill='#606571'
                                stroke='#777a80'
                                strokeWidth='8'
                            />
                            <line x1='831.5' y1='866.5' x2='748' y2='908' fill='#606571' stroke='#777a80' strokeWidth='8' />
                        </g>
                    </g>
                    <g
                        id='TheWhites_S1'
                        className={houseName === 'whites1' ? styles.activeBuilding : houseName === 'whites' ? '' : styles.standartBuilding}
                    >
                        <g>
                            <polygon points='754.27 913.39 754.27 962.44 686.74 993.39 686.74 944.5 754.27 913.39' fill='#606571' />
                            <polygon
                                points='754.27 913.39 686.74 944.5 681 941 681 881 747.42 849.89 747.42 908.54 754.27 913.39'
                                fill='#606571'
                            />
                            <polygon
                                points='747.42 849.89 681 881 674 875.5 674 735.5 704.5 719.5 704.5 691 740.57 674.22 740.57 845.04 747.42 849.89'
                                fill='#606571'
                            />
                            <polygon
                                points='740.57 674.22 704.5 691 699 686 666.5 701 583.61 641.86 619.62 625.35 626.03 629.89 657.55 615.45 740.57 674.22'
                                fill='#606571'
                            />
                            <polygon points='704.5 691 704.5 719.5 674 735.5 666.5 731 666.5 701 699 686 704.5 691' fill='#606571' />
                            <polygon
                                points='686.74 944.5 686.74 993.39 579.29 917.32 579.29 868.27 583.61 866.29 583.61 641.86 666.5 701 666.5 731 674 735.5 674 875.5 681 881 681 941 686.74 944.5'
                                fill='#606571'
                            />
                        </g>
                        <g>
                            <polyline
                                points='686.74 993.39 754.27 962.44 754.27 913.39'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='686.74 993.39 579.29 917.32 579.29 868.27 583.61 866.29 583.61 641.86'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='686.74'
                                y1='993.39'
                                x2='686.74'
                                y2='944.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='754.27 913.39 747.42 908.54 747.42 849.89'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='754.27'
                                y1='913.39'
                                x2='686.74'
                                y2='944.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='747.42 849.89 740.57 845.04 740.57 674.22'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='747.42'
                                y1='849.89'
                                x2='681'
                                y2='881'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='740.57 674.22 657.55 615.45 626.03 629.89 619.62 625.35 583.61 641.86'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='740.57'
                                y1='674.22'
                                x2='704.5'
                                y2='691'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='583.61'
                                y1='641.86'
                                x2='666.5'
                                y2='701'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='666.5 701 699 686 704.5 691'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='666.5 701 666.5 731 674 735.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='704.5 691 704.5 719.5 674 735.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='674 735.5 674 875.5 681 881'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='681 881 681 941 686.74 944.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                        </g>
                    </g>
                </g>
                <g id='TheBrownSilver'>
                    <g
                        id='TheSilver'
                        className={houseName === 'silver' ? styles.activeBuilding : styles.standartBuilding}
                        onClick={() => {
                            if (theme === 'dark') setActiveHouse('silver');
                        }}
                    >
                        <g>
                            <polygon
                                points='276.36 647.95 276.36 935.35 174.6 962.18 174.6 911.5 180.5 909.5 180.5 477.5 264.89 454.78 264.89 634.2 276.36 647.95'
                                fill='#606571'
                            />
                            <polygon points='201.2 378.36 264.89 454.78 180.5 477.5 116.66 400.64 201.2 378.36' fill='#606571' />
                            <polygon
                                points='180.5 477.5 180.5 909.5 174.6 911.5 105.57 828.95 113.63 826.82 113.63 593.2 116.66 592.4 116.66 400.64 180.5 477.5'
                                fill='#606571'
                            />
                            <polygon points='174.6 911.5 174.6 962.18 105.57 879.32 105.57 828.95 174.6 911.5' fill='#606571' />
                        </g>
                        <g>
                            <polyline
                                points='264.89 454.78 201.2 378.36 116.66 400.64'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='264.89 454.78 264.89 634.2 276.36 647.95 276.36 935.35 174.6 962.18'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='264.89'
                                y1='454.78'
                                x2='180.5'
                                y2='477.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='174.6 962.18 105.57 879.32 105.57 828.95'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='174.6'
                                y1='962.18'
                                x2='174.6'
                                y2='911.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='105.57 828.95 113.63 826.82 113.63 593.2 116.66 592.4 116.66 400.64'
                                fill='none'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='105.57'
                                y1='828.95'
                                x2='174.6'
                                y2='911.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='116.66'
                                y1='400.64'
                                x2='180.5'
                                y2='477.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='180.5 477.5 180.5 909.5 174.6 911.5'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                        </g>
                    </g>
                    <g className={styles.standartBuilding}>
                        <path
                            id='Vector_1-2'
                            d='M348,813l-21.5-27-49,14v32.5m70.5-19.5v29.5l-70.5,18.5v-28.5m70.5-19.5l-70.5,19.5'
                            fill='#606571'
                            stroke='#777a80'
                            strokeWidth='8'
                        />
                    </g>
                    <g
                        id='TheBrown'
                        className={houseName === 'brown' ? styles.activeBuilding : styles.standartBuilding}
                        onClick={() => {
                            if (theme === 'dark') setActiveHouse('brown');
                        }}
                    >
                        <g>
                            <polygon
                                points='503.83 772.19 503.83 800.09 348.19 841.12 348.19 813.23 348.19 795 360.5 792.15 360.5 548 482.93 515.55 482.93 605.73 493.11 617.95 493.11 759.33 493.11 775 503.83 772.19'
                                fill='#606571'
                            />
                            <polygon points='440.03 464.07 482.93 515.55 360.5 548 316.96 496.52 440.03 464.07' fill='#606571' />
                            <polygon
                                points='360.5 548 360.5 792.15 348.19 795 299.99 737.08 314.08 733.36 314.08 598.15 316.96 597.39 316.96 496.52 360.5 548'
                                fill='#606571'
                            />
                            <polygon
                                points='348.19 795 348.19 813.23 326.44 787.13 307.38 792.15 299.99 783.28 299.99 737.08 348.19 795'
                                fill='#606571'
                            />
                        </g>
                        <g>
                            <polyline
                                points='348.19 813.23 348.19 841.12 503.83 800.09 503.83 772.19 493.11 775 493.11 759.33 493.11 617.95 482.93 605.73 482.93 515.55'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='348.19 813.23 326.44 787.13 307.38 792.15 299.99 783.28 299.99 737.08'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='348.19'
                                y1='813.23'
                                x2='348.19'
                                y2='795'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='482.93 515.55 440.03 464.07 316.96 496.52'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='482.93'
                                y1='515.55'
                                x2='360.5'
                                y2='548'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='316.96 496.52 316.96 597.39 314.08 598.15 314.08 733.36 299.99 737.08'
                                fill='none'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='316.96'
                                y1='496.52'
                                x2='360.5'
                                y2='548'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <line
                                x1='299.99'
                                y1='737.08'
                                x2='348.19'
                                y2='795'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                            <polyline
                                points='360.5 548 360.5 792.15 348.19 795'
                                fill='#606571'
                                stroke='#777a80'
                                strokeMiterlimit='10'
                                strokeWidth='8'
                            />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default MiniMap;

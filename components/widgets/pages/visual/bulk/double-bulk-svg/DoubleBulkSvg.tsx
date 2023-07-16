import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DoubleBulkSvg.module.scss';
import SVG from 'react-inlinesvg';
import { setCurrentBulkId, setCurrentFloor } from '../../../../../../store/slices/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../hook';
import { getAllFlats } from '../../../../../../store/slices/selectors';
import { useRouter } from 'next/router';
import ROUTES from '../../../../../../constants/routes';
import { setHintElement, setHintIsShow } from '../../../../../../store/slices/components/componentsSlice';

export interface IDoubleBulkSvg {
    bulkId: number;
    houseName: string;
    className: string;
    amountFloors: number;
    bulkIds: { id: number; name: string }[];
}

const DoubleBulkSvg: React.FC<IDoubleBulkSvg> = ({ bulkId, houseName, className, amountFloors, bulkIds }) => {
    const router = useRouter();
    const [top, setTop] = useState(0);
    const allFlats = useAppSelector(getAllFlats);
    const svgRef = useRef<SVGElement>(null);
    const dispatch = useAppDispatch();
    const [widthSvg, setWidthSvg] = useState<number>(0);
    const [floorsLabel, setFloorsLabel] = useState<{ number: number; top: number }[]>([]);
    const [init, setInit] = useState(false);

    const beforeSvgInjection = useCallback(() => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        //Получаем список элементов домов
        let svgElements = [...Array.from(svg.children)].find((item) => item.id === 'floors');
        if (!svgElements) return;
        let floors = [...Array.from(svgElements.children)].filter((item) => item.id !== 'floorT') as Element[];

        setInit(true);

        floors.forEach((item) => {
            let bulk = item.id.split('_')[0];
            let floor = item.id.replace(`${bulk}_`, '');

            if (allFlats.find((item) => item.bulk_id === +bulk && item.floor === +floor)) {
                item.classList.add(styles.current);
            } else {
                item.classList.add(styles.disabled);
            }

            item.addEventListener('mouseenter', () => {
                dispatch(setHintIsShow(true));
                dispatch(setCurrentFloor(+floor));
                dispatch(setCurrentBulkId(+bulk));
                dispatch(setHintElement(item));
            });

            item?.addEventListener('mouseleave', () => {
                dispatch(setHintIsShow(false));
            });

            item.addEventListener('click', () => {
                router.push(`${ROUTES.visual.root}/${bulk}/${floor}`);
            });
        });
    }, []);

    useEffect(() => {
        if (svgRef.current) {
            setTop(svgRef.current.getBoundingClientRect().top);
        }

        let floors = document.getElementById('floors');

        if (floors) {
            setWidthSvg(floors.getBoundingClientRect().width);
        }
    }, [svgRef.current, setTop, top]);

    useEffect(() => {
        let last = document.getElementById(`${bulkId}_${amountFloors}`);
        let middle = document.getElementById(`${bulkId}_${Math.floor((amountFloors - 7) / 2 + 7)}`);
        let first = document.getElementById(`${bulkId}_${7}`);

        if (last && middle && first && top !== 0) {
            if (floorsLabel.length === 0) {
                setFloorsLabel([
                    {
                        number: amountFloors,
                        top: last.getBoundingClientRect().top + last.getBoundingClientRect().height / 4 - top,
                    },
                    {
                        number: Math.floor((amountFloors - 7) / 2 + 7),
                        top: middle.getBoundingClientRect().top + middle.getBoundingClientRect().height / 4 - top,
                    },
                    {
                        number: 7,
                        top: first.getBoundingClientRect().top + first.getBoundingClientRect().height / 4 - top,
                    },
                ]);
            }
        }
    }, [init, top]);

    return (
        <>
            <SVG
                src={`/plans/${houseName}.svg`}
                className={className + ' facade'}
                onLoad={() => beforeSvgInjection()}
                id={'plan'}
                innerRef={svgRef}
            />
            {floorsLabel && (
                <div className={styles.labels}>
                    {floorsLabel.map((item) => {
                        return (
                            <span key={item.number} className={styles.number} style={{ transform: `translateY(${item.top}px)` }}>
                                {item.number}
                            </span>
                        );
                    })}
                    <div className={styles.massages} style={{ width: `${widthSvg}px` }}>
                        {bulkIds.map((item) => {
                            return (
                                <div className={styles.message} key={item.name}>
                                    <span>Секция {item.name}</span>
                                    <span>
                                        {allFlats.filter((elem) => elem.bulk_id === item.id).find((item) => item.attributes.whiteBox)
                                            ? 'White box'
                                            : 'Без отделки'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default DoubleBulkSvg;

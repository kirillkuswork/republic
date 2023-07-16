import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SoloBulkSvg.module.scss';
import SVG from 'react-inlinesvg';
import { setCurrentBulkId, setCurrentFloor } from '../../../../../../store/slices/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../hook';
import { getAllFlats, getCurrentHouseNameFlats } from '../../../../../../store/slices/selectors';
import ROUTES from '../../../../../../constants/routes';
import { useRouter } from 'next/router';
import { setHintElement, setHintIsShow } from '../../../../../../store/slices/components/componentsSlice';

export interface ISoloBulkSvg {
    bulkId: number;
    houseName: string;
    className: string;
    amountFloors: number;
    containerWidth: number;
}

const SoloBulkSvg: React.FC<ISoloBulkSvg> = ({ bulkId, houseName, className, amountFloors, containerWidth }) => {
    const router = useRouter();
    const allFlats = useAppSelector(getAllFlats);
    const currentBulkFlats = useAppSelector(getCurrentHouseNameFlats);
    const svgRef = useRef<SVGElement>(null);
    const dispatch = useAppDispatch();
    const [top, setTop] = useState(0);
    const [widthSvg, setWidthSvg] = useState<number>(0);
    const [floorsLabel, setFloorsLabel] = useState<{ number: number; top: number }[]>([]);
    const [init, setInit] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const beforeSvgInjection = useCallback(() => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        //Получаем список элементов домов
        let svgElements = [...Array.from(svg.children)].find((item) => item.id === 'floors');
        if (!svgElements) return;
        //Получаем список этажей
        let floors = [...Array.from(svgElements.children)].filter((item) => item.id !== 'floorT');

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
                dispatch(setCurrentFloor(+floor));
                dispatch(setCurrentBulkId(+bulk));
                dispatch(setHintIsShow(true));
                dispatch(setHintElement(item));
            });

            item.addEventListener('mouseleave', () => {
                dispatch(setHintIsShow(false));
            });

            item.addEventListener('click', () => {
                router.push(`${ROUTES.visual.root}/${bulk}/${floor}`);
            });
        });
    }, [floorsLabel]);

    useEffect(() => {
        if (svgRef.current) {
            setTop(svgRef.current.getBoundingClientRect().top);
            setWidthSvg(svgRef.current.getBoundingClientRect().width);
        }
    }, [svgRef.current, setTop, top]);

    useEffect(() => {
        let last = document.getElementById(`${bulkId}_${amountFloors}`);
        let middle = document.getElementById(`${bulkId}_${Math.floor((amountFloors - 7) / 2 + 7)}`);
        let first = document.getElementById(`${bulkId}_${7}`);
        if (last && middle && first && top !== 0) {
            if (floorsLabel.length === 0) {
                setFloorsLabel([
                    { number: amountFloors, top: last.getBoundingClientRect().top - top },
                    { number: Math.floor((amountFloors - 7) / 2 + 7), top: middle.getBoundingClientRect().top - top },
                    { number: 7, top: first.getBoundingClientRect().top - top },
                ]);
            }
        }
    }, [init, top, floorsLabel]);

    useEffect(() => {
        setTranslateX((containerWidth + widthSvg) / 2 + 141);
    }, [containerWidth, widthSvg, init, floorsLabel]);

    return (
        <>
            <SVG
                src={`/plans/${houseName}.svg`}
                className={className + ' facade'}
                onLoad={() => beforeSvgInjection()}
                id={'plan'}
                innerRef={svgRef}
            />
            {floorsLabel.length !== 0 && (
                <div className={styles.labels}>
                    {floorsLabel.map((item) => {
                        return (
                            <span
                                key={item.number}
                                className={styles.number}
                                style={{ transform: `translateY(${item.top}px) translateX(${translateX}px)` }}
                            >
                                {item.number}
                            </span>
                        );
                    })}
                    <div className={styles.message}>
                        {currentBulkFlats.find((item) => item.attributes.whiteBox) ? 'White box' : 'Без отделки'}
                    </div>
                </div>
            )}
        </>
    );
};

export default SoloBulkSvg;

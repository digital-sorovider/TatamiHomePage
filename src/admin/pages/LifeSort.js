import SubTitle from "@components/Subtitle";
import { getAll } from "@lib/firebase";
import { groupBy } from "@util/Query";
import { useEffect, useState } from "react";
import { Title, useNotify } from "react-admin"
import Style from '@style/components/SubProduct.module.scss';
import dataProvider from "@admin/providers/firestoreDataProvider";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "@admin/components/SortableItem";
import AdminSubProduct from "@admin/components/AdminSubProduct";
import { CardContent } from "@mui/material";
import Heading from "@components/Heading";

const LifeSort = () => {
    const [lifes, setLifes] = useState([])

    const notify = useNotify();

    useEffect(() => {
        getAll('life', { sort: [{ field: 'sortNum', order: 'asc' }] }).then(lifeData => {
            lifeData = lifeData.map(life => {
                return {
                    ...life,
                    href: life.url || `/life/${life.id}`,
                    img: life.mainImg?.src || '',
                    imgTitle: life.shortTitle,
                }
            })
            setLifes(lifeData)
        })
    }, [])

    const onDragEndHandle = async ({ active, over }) => {
        if (!active || !over || active.id === over.id) return

        const oldIndex = lifes.findIndex(life => life.id === active.id);
        const newIndex = lifes.findIndex(life => life.id === over.id)
        const newLifes = arrayMove(lifes, oldIndex, newIndex).map((life, index) => ({ ...life, sortNum: index }))

        setLifes(newLifes);

        const changedItems = [];

        for (let i = Math.min(oldIndex, newIndex); i <= Math.max(oldIndex, newIndex); i++) {
            if (lifes[i].id !== newLifes[i].id) {
                changedItems.push({
                    id: lifes[i].id,
                    sortNum: newLifes.findIndex(life => life.id === lifes[i].id)
                });

                changedItems.push({
                    id: newLifes[i].id,
                    sortNum: i
                });
            }
        }

        // Remove duplicates
        const uniqueChangedIds = changedItems.filter((item, index, self) =>
            index === self.findIndex(t => t.id === item.id)
        );

        for await (const { id, sortNum } of uniqueChangedIds) {
            await dataProvider.update('life', { id, data: { sortNum } })
        }
        notify("並び順の保存完了", { type: 'success' })
    }

    const sensors = useSensors(useSensor(PointerSensor));


    return (
        <>
            <Title title="楽しむポイント順並び替え" />
            <Heading heading="楽しむポイント順並び替え" />
            <CardContent>
                <DndContext
                    sensors={sensors}
                    onDragEnd={onDragEndHandle}
                >
                    <SortableContext items={lifes}>
                        <div className={Style['sub-products']}>
                            {lifes.map((life) => (
                                <SortableItem key={life.id} id={life.id}>
                                    <AdminSubProduct product={life} key={life.id} />
                                </SortableItem>
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </CardContent>
        </ >
    )
}

export default LifeSort
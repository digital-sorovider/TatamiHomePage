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

const merge = (oldData, newData) => {
    return oldData.map(item => {
        const newItem = newData.find(n => n.id === item.id);
        if (newItem) {
            return { ...item, sortNum: newItem.sortNum };
        }
        return item;
    });
}

const EventSort = () => {
    const [events, setEvents] = useState([])
    const [eventsGroups, setEventsGroup] = useState([])


    const notify = useNotify();

    useEffect(() => {
        getAll('event').then(eventData => {
            eventData = eventData.map(event => {
                return {
                    ...event,
                    href: event.url || `/event/${event.id}`,
                    img: event.mainImg?.src || '',
                    imgTitle: event.title,
                    eventTypeName: event.eventType.title || ''
                }
            })
            setEvents(eventData)
            setEventsGroup(groupBy(
                eventData,
                'eventTypeName',
                {
                    groupSort:['eventType.sortNum', 'asc'],
                    itemSort: ['sortNum', 'asc']
                }
            ))
        })
    }, [])

    const onDragEndHandle = async ({ active, over }) => {
        if (!active || !over || active.id === over.id) return

        const { eventTypeName } = events.find(({id}) => id === active.id)
        const [_, eventData ] = eventsGroups.find(([groupName]) => groupName === eventTypeName)

        const oldIndex = eventData.findIndex(event => event.id === active.id);
        const newIndex = eventData.findIndex(event => event.id === over.id)
        const newEvents = arrayMove(eventData, oldIndex, newIndex).map((event, index) => ({ ...event, sortNum: index }))

        const mergedEvents = merge(events, newEvents)


        setEvents(mergedEvents);
        setEventsGroup(groupBy(
            mergedEvents,
            'eventTypeName',
            {
                groupSort:['eventType.sortNum', 'asc'],
                itemSort: ['sortNum', 'asc']
            }
        ))

        const changedItems = [];

        for (let i = Math.min(oldIndex, newIndex); i <= Math.max(oldIndex, newIndex); i++) {
            if (eventData[i].id !== newEvents[i].id) {
                changedItems.push({
                    id: events[i].id,
                    sortNum: newEvents.findIndex(event => event.id === events[i].id)
                });

                changedItems.push({
                    id: newEvents[i].id,
                    sortNum: i
                });
            }
        }

        // Remove duplicates
        const uniqueChangedIds = changedItems.filter((item, index, self) =>
            index === self.findIndex(t => t.id === item.id)
        );

        for await (const { id, sortNum } of uniqueChangedIds) {
            await dataProvider.update('event', { id, data: { sortNum } })
        }
        notify("並び順の保存完了", { type: 'success' })
    }

    const sensors = useSensors(useSensor(PointerSensor));


    return (
        <>
            <Title title="イベント順並び替え" />
            <CardContent>
                <Heading heading="イベント順並び替え" />
                <DndContext
                    sensors={sensors}
                    onDragEnd={onDragEndHandle}
                >
                    {eventsGroups.map(([groupName, eventsGroup]) => (
                    <SortableContext items={eventsGroup} key={groupName}>
                        <SubTitle subtitle={groupName} />
                        <div className={Style['sub-products']}>
                            {eventsGroup.map((event) => (
                                <SortableItem key={event.id} id={event.id}>
                                    <AdminSubProduct product={event} key={event.id} />
                                </SortableItem>
                            ))}
                        </div>
                    </SortableContext>
                    ))}
                </DndContext>
            </CardContent>
        </ >
    )
}

export default EventSort
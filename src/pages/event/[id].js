
import { getOne, getAll } from '@lib/firebase';
import Heading from '@components/Heading';
import Style from '@style/pages/EventDetail.module.scss'

import parse from 'html-react-parser';

const EventDetail = ({event: { title, body } }) => {
    body = body?.replace(/colwidth="([0-9]+)"/g, `style="width: $1px"`) || ''

    return (
        <>
            <Heading heading={title} />
            <div className={Style["event-body"]}>{ parse(`${body}`) }</div>
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    const event = await getOne('event', params.id)

    return {
        props: { event },
        revalidate: 60,
    }
}

export const getStaticPaths = async () => {
    const events = await getAll('event')
    const paths = events.map(({id}) => ({ params: { id } }))

    return { paths, fallback: false }
}


export default EventDetail;

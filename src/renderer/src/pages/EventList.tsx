import Card from '@renderer/components/Card/Card'
import { useEffect, useState } from 'react'

const EventList = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        ; (window as any).api.fetchEvents().then((res) => {
            if (res.ResponseType == 'SUCCESS') {
                console.log(res.data.result)
                setData(res.data.result)
            }
        })
    }, [])

    return (
        <div>
            {data.map((item: any, index: number) => (
                <Card image={item?.event_thumbnail_url} title={item?.event_name} key={index} />
            ))}
        </div>
    )
}

export default EventList

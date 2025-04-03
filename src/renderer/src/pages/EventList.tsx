import Card from '@renderer/components/Card/Card'
import { useEffect, useRef, useState } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const EventList = () => {
    const keyboardRef = useRef(null)
    const [data, setData] = useState([])
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [inputText, setInputText] = useState('')
    const [layoutName, setLayoutName] = useState('default')

    useEffect(() => {
        ; (window as any).api.fetchEvents().then((res) => {
            if (res.ResponseType == 'SUCCESS') {
                setData(res.data.result)
            }
        })
    }, [])

    const onChange = (input) => {
        setInputText(input)
    }

    const onKeyPress = (button) => {
        if (button === '{enter}') {
            setIsInputFocused(false)
        }
        if (button === '{lock}') handleShift()
    }

    const handleShift = () => {
        const layout = layoutName
        setLayoutName(layout === 'default' ? 'shift' : 'default')
    }

    window.addEventListener('keydown', function (event) {
        event.preventDefault()
    })

    window.addEventListener("keydown", (event) => {
        const scrollAmount = 20; // Adjust scroll speed

        if (event.key === "ArrowDown") {
            window.scrollBy(0, scrollAmount);
        } else if (event.key === "ArrowUp") {
            window.scrollBy(0, -scrollAmount);
        } else if (event.key === "ArrowRight") {
            window.scrollBy(scrollAmount, 0);
        } else if (event.key === "ArrowLeft") {
            window.scrollBy(-scrollAmount, 0);
        }
    });

    return (
        <div className="event-page">
            <input
                value={inputText}
                type="text"
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
            />
            {isInputFocused ? (
                <Keyboard
                    keyboardRef={(r) => (keyboardRef.current = r)}
                    layoutName={layoutName}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            ) : null}
            <div className="event-list">
                {data.map((item: any, index: number) => (
                    <Card image={item?.event_thumbnail_url} title={item?.event_name} key={index} />
                ))}
            </div>
        </div>
    )
}

export default EventList

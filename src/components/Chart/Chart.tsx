import  { useState,useId, useEffect } from 'react'

//file
import startOpt from './startOpt.json'
import s from './Chart.module.css'
//code

interface IOpt {
    name: string,
    time: number
}
export default function Chart() {
    const [opt, setOpt] = useState<IOpt[]>(startOpt)
    const [totalTime, setTotalTime] = useState(0)

    
    useEffect(() => {
        let interval: NodeJS.Timer
        
         interval = setInterval(() => {
        handlCklick()
         }, 530)
        
        return () => { clearInterval(interval)}
    
     },[])

    useEffect(() => {
        const total = opt.reduce((number, el) => {
            return number + el.time
        }, 0)


          setTotalTime(total)
  
    }, [opt])
 


    const handlCklick = () => {
        
        const randomOpt = opt.map((elem, idx) => {
            const newTime = Math.random() * 100
            return {name:elem.name, time:newTime}
        })
        helperLet = 0
        setOpt(randomOpt)
}
let helperLet: number  = 0
    const helper = (elem: { name: string, time: number }, idx: number): string => {
         const startTime = idx === 0 ? 0: opt[idx - 1].time
        const procStart = (opt[idx].time / totalTime * 100).toFixed()
         helperLet = +procStart + helperLet
        return `linear-gradient(to right,
      gray ${helperLet - +procStart}%, blue ${helperLet - +procStart}%, blue ${helperLet}%, gray ${helperLet}% )`
    }


    const newId = useId
    
    return <section>
        <h2>Chart</h2>
<button type='button' onClick={handlCklick}> Ну давай!!!</button>
        <ul className={s.block}> 
        {opt.map((elem, idx) => {
           
                        return <li key={newId()} >
                            <h3>{elem.name}</h3>
                            <p className={s.line} style={{backgroundImage:helper(elem, idx) ,
                            }} >{(opt[idx].time / totalTime *100).toFixed(2)}</p>
            </li>
        })}
    </ul>
    </section>
}
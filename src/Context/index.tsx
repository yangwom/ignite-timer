import { ReactNode, createContext, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  interruptedDate?: Date
  finishedDate?: Date
  startDate: Date | number
}
type newCicleDataForm = {
  task: string
  minutesAmount: number
}

interface CycleContex {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentFineshed: () => void
  createNewCycle: (data: newCicleDataForm) => void
  handleInterruptCycle: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const cycleContext = createContext({} as CycleContex)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId)
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: newCicleDataForm): void {
    const id = `${cycles.length + 1}`

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state: Cycle[]) => [...state, newCycle])
    setActiveCycleId(id)
    // reset()
    setAmountSecondsPassed(0)
  }

  function markCurrentFineshed() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <cycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentFineshed,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </cycleContext.Provider>
  )
}

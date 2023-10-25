import { useFormContext } from 'react-hook-form'
import { FormContainer, MinutesAmountInput, TaskInput } from './style'
import { useContext } from 'react'
import { cycleContext } from '../../../Context'

export function NewCycleForm() {
  const { activeCycle } = useContext(cycleContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        list="#task-suggestion"
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        id="task"
        {...register('task')}
      />

      <datalist id="#task-suggestion">
        <option value="projeto-1" />
        <option value="projeto-1" />
        <option value="projeto-1" />
        <option value="projeto-1" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormContainer>
  )
}

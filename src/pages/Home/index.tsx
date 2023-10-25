import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { cycleContext } from '../../Context'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  HomeContainer,
  StopCountdownButton,
  StartCountdownButton,
} from './style'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'no minimo 5 minutos')
    .max(60, 'no maximo 60 minutos'),
})

type newCicleDataForm = zod.infer<typeof newCycleFormValidationSchema>

export function Homee() {
  const { activeCycle, createNewCycle, handleInterruptCycle } =
    useContext(cycleContext)

  const newCycleForm = useForm<newCicleDataForm>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: newCicleDataForm) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')

  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

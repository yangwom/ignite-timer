import { useContext } from 'react'
import { cycleContext } from '../../Context'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, StatusComponent } from './styles'

export function History() {
  const { cycles } = useContext(cycleContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Duração</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <StatusComponent statusColor="green">
                        Concluído
                      </StatusComponent>
                    )}

                    {cycle.interruptedDate && (
                      <StatusComponent statusColor="red">
                        Interrompido
                      </StatusComponent>
                    )}

                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <StatusComponent statusColor="yellow">
                        Em andamento
                      </StatusComponent>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

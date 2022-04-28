import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useScrollTest(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [logs, setLogs] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLogs([])
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'http://localhost:3000/logs',
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLogs(prevLogs => {
        return [...new Set([...prevLogs, ...res.data.docs.map(b => b.notes)])]
      })
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, logs, hasMore }
}
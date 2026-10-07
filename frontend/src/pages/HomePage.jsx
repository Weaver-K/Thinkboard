import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

import api from '../lib/axios.js'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard.jsx'

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const fetchNotes = async () => {
            try {
                setLoading(true)
                const res = await api.get('/notes')

                if (!isMounted) return

                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false)
            } catch (error) {
                if (!isMounted) return

                console.log('Error fetching notes')
                console.log(error)
                if (error.response?.status === 429) {
                    setIsRateLimited(true)
                } else {
                    toast.error('Failed to load notes')
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchNotes()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className="min-h-screen">
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && (
                    <div className="text-center text-primary py-10">
                        Loading notes...
                    </div>
                )}

                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                setNotes={setNotes}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage

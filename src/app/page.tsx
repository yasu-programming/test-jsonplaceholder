'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  username: string
  email: string
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface Todo {
  id: number
  title: string
  completed: boolean
  userId: number
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'users' | 'posts' | 'todos'>('users')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const [usersRes, postsRes, todosRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/todos')
        ])

        const [usersData, postsData, todosData] = await Promise.all([
          usersRes.json(),
          postsRes.json(),
          todosRes.json()
        ])

        setUsers(usersData.slice(0, 5))
        setPosts(postsData.slice(0, 5))
        setTodos(todosData.slice(0, 5))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          JSONPlaceholder API Sample
        </h1>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'posts'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'todos'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-gray-600">@{user.username}</p>
                      <p className="text-blue-600">{user.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Posts</h2>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-700">{post.body}</p>
                      <p className="text-sm text-gray-500 mt-2">User ID: {post.userId}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'todos' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Todos</h2>
                <div className="space-y-4">
                  {todos.map(todo => (
                    <div key={todo.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                          {todo.title}
                        </h3>
                        <span className={`px-2 py-1 rounded text-sm ${
                          todo.completed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {todo.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">User ID: {todo.userId}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
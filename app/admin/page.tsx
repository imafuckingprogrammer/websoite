'use client'

import React, { useState, useEffect } from 'react';
import { supabase, NewsletterSubscriber, ContactMessage } from '../../src/lib/supabase';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function AdminPage() {
  const { darkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'messages' | 'subscribers'>('messages');

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
    setIsLoading(false);
    if (session) {
      fetchData();
    }
  };

  const fetchData = async () => {
    const { data: messagesData } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (messagesData) setMessages(messagesData);

    const { data: subscribersData } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (subscribersData) setSubscribers(subscribersData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setIsLoggedIn(true);
      fetchData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setMessages([]);
    setSubscribers([]);
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id);

    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = async (id: string) => {
    await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    setMessages(messages.filter(m => m.id !== id));
  };

  const deleteSubscriber = async (id: string) => {
    await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);

    setSubscribers(subscribers.filter(s => s.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const bgColor = darkMode ? 'bg-neutral-950' : 'bg-cream-100';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-white/10' : 'border-black/10';
  const mutedText = darkMode ? 'text-white/60' : 'text-black/60';
  const cardBg = darkMode ? 'bg-white/5' : 'bg-black/5';

  if (isLoading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className={textColor}>Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center p-4`}>
        <div className="w-full max-w-md">
          <h1 className={`text-3xl font-bold ${textColor} mb-8 text-center`}>Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={`block ${mutedText} text-sm mb-2`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${cardBg} border ${borderColor} ${textColor} outline-none focus:border-opacity-30`}
                required
              />
            </div>
            <div>
              <label className={`block ${mutedText} text-sm mb-2`}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${cardBg} border ${borderColor} ${textColor} outline-none focus:border-opacity-30`}
                required
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-medium transition-colors ${
                darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className={`${mutedText} hover:opacity-70 text-sm`}>← Back to site</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      <header className={`border-b ${borderColor} px-6 py-4`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Caret Design Admin</h1>
          <div className="flex items-center gap-4">
            <a href="/" className={`text-sm ${mutedText} hover:opacity-70`}>View Site</a>
            <button onClick={handleLogout} className={`text-sm ${mutedText} hover:opacity-70`}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'messages'
                ? (darkMode ? 'bg-white text-black' : 'bg-black text-white')
                : `${cardBg} ${mutedText} hover:opacity-70`
            }`}
          >
            Messages ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'subscribers'
                ? (darkMode ? 'bg-white text-black' : 'bg-black text-white')
                : `${cardBg} ${mutedText} hover:opacity-70`
            }`}
          >
            Subscribers ({subscribers.length})
          </button>
        </div>

        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className={mutedText}>No messages yet.</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 rounded-2xl border ${
                    message.read
                      ? `${cardBg} ${borderColor}`
                      : darkMode ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{message.name}</h3>
                      <p className={`${mutedText} text-sm`}>{message.email}</p>
                      {message.company && <p className={`${mutedText} text-sm opacity-60`}>{message.company}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      {!message.read && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">New</span>
                      )}
                      <span className={`${mutedText} text-sm`}>{formatDate(message.created_at)}</span>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-white/80' : 'text-black/80'} mb-4 whitespace-pre-wrap`}>{message.message}</p>
                  <div className="flex gap-3">
                    {!message.read && (
                      <button onClick={() => markAsRead(message.id)} className={`text-sm ${mutedText} hover:opacity-70`}>
                        Mark as read
                      </button>
                    )}
                    <a href={`mailto:${message.email}`} className="text-sm text-blue-400 hover:text-blue-300">Reply</a>
                    <button onClick={() => deleteMessage(message.id)} className="text-sm text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div>
            {subscribers.length === 0 ? (
              <p className={mutedText}>No subscribers yet.</p>
            ) : (
              <div className={`${cardBg} rounded-2xl border ${borderColor} overflow-hidden`}>
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${borderColor}`}>
                      <th className={`text-left px-6 py-4 ${mutedText} font-medium`}>Email</th>
                      <th className={`text-left px-6 py-4 ${mutedText} font-medium`}>Subscribed</th>
                      <th className={`text-right px-6 py-4 ${mutedText} font-medium`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className={`border-b ${borderColor} last:border-0`}>
                        <td className="px-6 py-4">{subscriber.email}</td>
                        <td className={`px-6 py-4 ${mutedText}`}>{formatDate(subscriber.created_at)}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteSubscriber(subscriber.id)} className="text-sm text-red-400 hover:text-red-300">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {subscribers.length > 0 && (
              <button
                onClick={() => {
                  const csv = 'email,subscribed_at\n' + subscribers.map(s => `${s.email},${s.created_at}`).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'subscribers.csv';
                  a.click();
                }}
                className={`mt-6 px-4 py-2 ${cardBg} border ${borderColor} rounded-lg text-sm hover:opacity-70 transition-colors`}
              >
                Export as CSV
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

import { writable } from 'svelte/store';
import { createClient } from '@supabase/supabase-js';
import { pushState, replaceState } from '$app/navigation';
import { goto } from '$app/navigation';

// Supabase client configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Debug logging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Stores
export const isAuthenticated = writable(false);
export const userRole = writable('');
export const userBranch = writable(null);
export const currentUser = writable(null);

// Fungsi untuk mencegah browser back button
function preventBackButton() {
    // Clear browser history untuk halaman yang memerlukan autentikasi
    if (typeof window !== 'undefined') {
        // Hapus semua history entries kecuali halaman login
        replaceState('/login', { replace: true });
        replaceState('/login', { replace: true });

        // Event listener untuk popstate (ketika user klik back button)
        window.addEventListener('popstate', (event) => {
            // Redirect ke login jika user mencoba kembali
            if (!event.state) {
                window.location.href = '/login';
            }
        });
    }
}

// Fungsi untuk setup history management
export function setupHistoryManagement() {
    if (typeof window !== 'undefined') {
        // Tambahkan entry baru ke history menggunakan SvelteKit API
        pushState(window.location.href, { authenticated: true });

        // Event listener untuk popstate
        window.addEventListener('popstate', (event) => {
            // Jika user klik back button dan tidak terautentikasi
            if (!isAuthenticated) { // Note: isAuthenticated here refers to the store, not its value directly.
                window.location.href = '/login';
            }
        });
    }
}

// Login function
export async function login(email, password) {
    try {
        console.log('Attempting login with:', email);
        
        // Simulate API call (replace with actual Supabase auth)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            throw new Error(error.message);
        }

        if (data.user) {
            // Fetch user role and branch from database dengan JOIN yang benar
            const { data: userData, error: userError } = await supabase
                .from('user_branches')
                .select(`
                    role,
                    branch_id,
                    branches (
                        id,
                        name,
                        state,
                        region
                    )
                `)
                .eq('user_id', data.user.id)
                .single();

            if (userError) {
                console.error('Error fetching user data:', userError);
                throw new Error('Gagal mengambil data pengguna');
            }

            if (userData) {
                // Update stores
                isAuthenticated.set(true);
                userRole.set(userData.role);
                userBranch.set(userData.branches || null);
                currentUser.set(data.user);

                // Store in localStorage
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userRole', userData.role);
                localStorage.setItem('userBranch', JSON.stringify(userData.branches || null));

                console.log('Login successful for role:', userData.role);
                
                // Setup history management setelah login berhasil
                setupHistoryManagement();
                
                return {
                    success: true,
                    message: 'Log masuk berjaya!',
                    user: data.user,
                    role: userData.role,
                    branch: userData.branches?.name || 'No Branch'
                };
            } else {
                throw new Error('Data pengguna tidak ditemui');
            }
        } else {
            throw new Error('Log masuk gagal');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw new Error(error.message || 'Log masuk gagal. Sila cuba lagi.');
    }
}

// Logout function
export async function logout() {
    try {
        // Clear Supabase session
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('Logout error:', error);
        }

        // Clear stores
        isAuthenticated.set(false);
        userRole.set('');
        userBranch.set(null);
        currentUser.set(null);

        // Clear localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userBranch');

        // Mencegah browser back button
        preventBackButton();

        console.log('Logout successful');
        
        // Redirect ke halaman login setelah logout berhasil
        if (typeof window !== 'undefined') {
            goto('/login');
        }
        
        return { success: true, message: 'Log keluar berjaya!' };
    } catch (error) {
        console.error('Logout error:', error);
        throw new Error('Log keluar gagal. Sila cuba lagi.');
    }
}

// Check authentication status
export async function checkAuthStatus() {
    try {
        // Check if user is authenticated
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Error checking session:', error);
            return false;
        }

        if (session && session.user) {
            // Check localStorage for role and branch
            const storedRole = localStorage.getItem('userRole');
            const storedBranch = localStorage.getItem('userBranch');
            
            if (storedRole && storedBranch) {
                // Update stores
                isAuthenticated.set(true);
                userRole.set(storedRole);
                userBranch.set(JSON.parse(storedBranch));
                currentUser.set(session.user);
                
                console.log('User authenticated:', storedRole);
                
                // Setup history management jika user sudah terautentikasi
                setupHistoryManagement();
                
                return true;
            } else {
                // If no stored role/branch, try to fetch from database
                const { data: userData, error: userError } = await supabase
                    .from('user_branches')
                    .select(`
                        role,
                        branch_id,
                        branches (
                            id,
                            name,
                            state,
                            region
                        )
                    `)
                    .eq('user_id', session.user.id)
                    .single();

                if (userData && !userError) {
                    // Update stores
                    isAuthenticated.set(true);
                    userRole.set(userData.role);
                    userBranch.set(userData.branches || null);
                    currentUser.set(session.user);

                    // Store in localStorage
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('userRole', userData.role);
                    localStorage.setItem('userBranch', JSON.stringify(userData.branches || null));

                    console.log('User authenticated from database:', userData.role);
                    
                    // Setup history management jika user sudah terautentikasi
                    setupHistoryManagement();
                    
                    return true;
                } else {
                    console.error('Error fetching user data:', userError);
                    return false;
                }
            }
        } else {
            // Clear stores if no session
            isAuthenticated.set(false);
            userRole.set('');
            userBranch.set(null);
            currentUser.set(null);
            
            console.log('No active session');
            return false;
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}

// Initialize auth status on module load
if (typeof window !== 'undefined') {
    checkAuthStatus();
}

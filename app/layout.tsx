export const metadata = {
  title: "Pokemon Search",
  description: "Search different pokemons",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          {children}
        </main>
    </body>
  </html>
);

export default RootLayout;
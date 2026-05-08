function ScreenContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col bg-orange-500 min-h-screen">{children}</div>;
}

function ResponsiveContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col max-w-xl mx-auto bg-white">{children}</div>;
}

function Topbar() {
  return (
    <header className="h-24 bg-red-500 w-full flex items-center justify-center">
      <ResponsiveContainer>
        <h1>Topbar is red and is always visible</h1>
      </ResponsiveContainer>
    </header>
  );
}

function DockBar() {
  return (
    <header className="h-24 transparent w-full flex items-center justify-center">
      <ResponsiveContainer>
        <h1>DockBar is black and is always visible</h1>
      </ResponsiveContainer>
    </header>
  );
}

function Dock() {
  return (
    <header className="h-24 transparent w-full flex items-center justify-center">
      <ResponsiveContainer>
        <h1>Dock is black and is always visible</h1>
      </ResponsiveContainer>
    </header>
  );
}

function DummyCard() {
  return (
    <div className="flex-1 bg-blue-500 h-24 w-24">
      <h1>Dummy Card</h1>
    </div>
  );
}

function ExplorePageServer() {
  return (
    // screen container
    <ScreenContainer>
      {/* top bar */}
      <Topbar />
      {/* main content */}
      <main>
        <DummyCard />
        <DummyCard />
        <DummyCard />
        <DummyCard />
        <DummyCard />
        {/* dock */}
        <div className="flex-none">
          <div className="flex">
            <div className="flex-1">
              <h1>Explore</h1>
            </div>
          </div>
        </div>
      </main>
    </ScreenContainer>
  );
}

export default ExplorePageServer;
